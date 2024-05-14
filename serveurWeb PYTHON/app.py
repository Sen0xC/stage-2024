# -*- coding: utf-8 -*-
from flask import Flask, request, Response, render_template, jsonify
from functools import wraps
import qi
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

app = Flask(__name__)

def check_auth(username, password):
    """Cette fonction est appelée pour vérifier si un nom d'utilisateur /
    mot de passe est valide."""
    return username == 'admin' and password == 'secret'

def authenticate():
    """Envoie une 401 réponse qui permet à l'utilisateur de s'authentifier"""
    return Response(
    'Vous devez vous connecter avec les bons identifiants pour accéder à cette URL.\n'
    'Vous devez vous connecter avec les identifiants adéquats.', 401,
    {'WWW-Authenticate': 'Basic realm="Login Requis"'})

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated



def create_session():
    session = qi.Session()
    try:
        session.connect("tcp://nao.local:9559")
        return session
    except RuntimeError as e:
        print(u"Impossible de se connecter au robot NAO à l'adresse 'tcp://nao.local:9559': {0}".format(repr(e)))
        return None

def get_nao_info(session):
    try:
        memory_service = session.service("ALMemory")
        battery_level = memory_service.getData("Device/SubDeviceList/Battery/Charge/Sensor/Value")
        battery_percentage = int(battery_level * 100)  # Convertit en pourcentage et supprime les décimales
        return u"Niveau de batterie : {}%".format(battery_percentage)
    except Exception as e:
        print(u"Erreur lors de la récupération de la donnée : {0}".format(repr(e)))
        return u"Erreur lors de la récupération de la donnée."
    
def disable_autonomous_life(session):
    autonomous_life_service = session.service("ALAutonomousLife")
    autonomous_life_service.setState("disabled")

def wake_up_robot(session):
    motion_service = session.service("ALMotion")
    motion_service.wakeUp()

def stand_up_robot(session):
    posture_service = session.service("ALRobotPosture")
    posture_service.goToPosture("Stand", 0.5)

@app.route('/', methods=['GET', 'POST'])
@requires_auth
def home():
    session = create_session()
    if session is None:
        nao_info = u"Robot non connecté ou indisponible."
    else:
        nao_info = get_nao_info(session)

    if request.method == 'POST':
        data = request.get_json()
        action = data.get('action')

        if action == 'get_volume':
            audio_device = session.service("ALAudioDevice")
            volume = audio_device.getOutputVolume()
            return jsonify(volume=volume)
        
        elif action == 'set_volume':
            new_volume = data.get('volume')
            if not isinstance(new_volume, int) or not (0 <= new_volume <= 100):
                return jsonify(message="Le volume doit être un entier entre 0 et 100."), 400
            audio_device = session.service("ALAudioDevice")
            audio_device.setOutputVolume(new_volume)
            return jsonify(message="Volume mis à jour.")
        
        elif action == 'start_behavior':
            behavior_name = data.get('behavior')
            behavior_manager = session.service("ALBehaviorManager")
            if behavior_manager.isBehaviorInstalled(behavior_name):
                behavior_manager.startBehavior(behavior_name)
                return jsonify(message="Comportement lancé avec succès."), 200
            else:
                return jsonify(message="Le comportement n'est pas installé sur le robot."), 404

    return render_template('index.html', info=nao_info)

@app.route('/get-behaviors')
def get_behaviors():
    session = create_session()
    if session is None:
        return jsonify(message="Robot non connecté ou indisponible."), 500
    
    behavior_manager = session.service("ALBehaviorManager")
    behaviors_list = behavior_manager.getInstalledBehaviors()
    return jsonify(behaviors=behaviors_list), 200

@app.route('/change-mode', methods=['POST'])
@requires_auth
def change_mode():
    session = create_session()
    if session is None:
        return jsonify(message="Robot non connecté ou indisponible."), 500

    data = request.get_json()
    if 'mode' not in data:
        return jsonify(message="Mode non spécifié."), 400

    mode = data['mode']

    if mode == 'disable':
        disable_autonomous_life(session)
        return jsonify(message="Mode autonome désactivé."), 200
    elif mode == 'wake_up':
        wake_up_robot(session)
        return jsonify(message="Robot réveillé."), 200
    elif mode == 'stand_up':
        stand_up_robot(session)
        return jsonify(message="Robot en posture debout."), 200
    else:
        return jsonify(message="Mode non reconnu."), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)