# -*- coding: utf-8 -*-
from flask import request, jsonify, render_template
from . import app
from .utils import create_session, create_session_pepper, create_session_nao, get_nao_info, disable_autonomous_life, get_pepper_info, wake_up_robot, stand_up_robot, requires_auth    
from models import Presentation, Content

@app.route('/')
@requires_auth
def home():
    return render_template('index.html')

@app.route('/manipNao', methods=['GET', 'POST'])
def manip_nao():
    session = create_session_nao()
    if session is None:
        nao_info = "Robot non connecté ou indisponible."
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

        elif action == 'disable':
            disable_autonomous_life(session)
            return jsonify(message="Mode autonome désactivé."), 200
        elif action == 'wake_up':
            wake_up_robot(session)
            return jsonify(message="Robot réveillé."), 200
        elif action == 'stand_up':
            stand_up_robot(session)
            return jsonify(message="Robot en posture debout."), 200

    return render_template('manipNao.html', info=nao_info)

@app.route('/get-behaviors')
def get_behaviors():
    session = create_session_pepper()
    if session is None:
        return jsonify(message="Robot non connecté ou indisponible."), 500
    
    behavior_manager = session.service("ALBehaviorManager")
    behaviors_list = behavior_manager.getInstalledBehaviors()
    return jsonify(behaviors=behaviors_list), 200

@app.route('/change-mode', methods=['POST'])
@requires_auth
def change_mode():
    session = create_session_pepper()
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


@app.route('/manipPepper', methods=['GET', 'POST'])
def manip_pepper():
    session = create_session_pepper()
    if session is None:
        pepper_info = u"Robot non connecté ou indisponible."
    else:
        pepper_info = get_pepper_info(session)

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

        else:
            return jsonify({'message': "Action non reconnue."}), 400

    return render_template('manipPepper.html', info=pepper_info)

@app.route('/ajoutInfoPepper', methods=['POST'])
def submit_content():
    session = create_session() # créer une session de base de données
    if request.method == 'POST':
        content_data = request.json
        presentation_name = None
        for content_item in content_data:
            if content_item['type'] == 'titre':
                presentation_name = content_item['value']
                # Suppression de l'élément de la liste pour que le nom ne soit pas ajouté au contenu de la présentation
                content_data.remove(content_item)
                break

        if not presentation_name:
            return jsonify({'error': 'Nom de présentation non spécifié'}), 400

        # Vérifier si la présentation existe déjà
        existing_presentation = session.query(Presentation).filter_by(name=presentation_name).first() # utiliser la session de base de données

        # Si la présentation n'existe pas, la créer
        if not existing_presentation:
            new_presentation = Presentation(name=presentation_name)
            session.add(new_presentation)
            session.commit()
            existing_presentation = new_presentation

        # Ajouter le contenu à la présentation
        for content_item in content_data:
            new_content = Content(type=content_item['type'], value=content_item['value'], presentation_id=existing_presentation.id)
            session.add(new_content)
            session.commit()

        session.close()
        return jsonify({'message': 'Données enregistrées avec succès'}), 200
        

    else:
        return jsonify({'error': 'Méthode non autorisée'}), 405
