# -*- coding: utf-8 -*-
from flask import Flask, request, Response, render_template, jsonify
from functools import wraps
import qi
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

def check_auth(username, password):

    return username == 'admin' and password == 'secret'

def authenticate():
    """Envoie une 401 réponse qui permet à l'utilisateur de s'authentifier"""
    return Response(
        'Connexion requise', 401,
        {'WWW-Authenticate': 'Basic realm="Login Requis"', 'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0', 'Pragma': 'no-cache'}
    )

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            response = authenticate()
            response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
            response.headers['Pragma'] = 'no-cache'
            return response
        return f(*args, **kwargs)
    return decorated


def create_session_pepper():
    session = qi.Session()
    try:
        session.connect("tcp://pepper.local:9559")
        return session
    except RuntimeError as e:
        print(u"Impossible de se connecter au robot Pepper à l'adresse 'tcp://pepper.local:9559': {0}".format(repr(e)))
        return None
    
def get_pepper_info(session):
    try:
        memory_service = session.service("ALMemory")
        battery_level = memory_service.getData("Device/SubDeviceList/Battery/Charge/Sensor/Value")
        battery_percentage = int(battery_level * 100)  # Convertit en pourcentage et supprime les décimales
        return u"Niveau de batterie : {}%".format(battery_percentage)
    except Exception as e:
        print(u"Erreur lors de la récupération de la donnée : {0}".format(repr(e)))
        return u"Erreur lors de la récupération de la donnée."
    

def create_session_nao():
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
    try:
        autonomous_life_service = session.service("ALAutonomousLife")
        autonomous_life_service.setState("disabled")
        print("Mode autonome désactivé avec succès.")
    except Exception as e:
        print(u"Erreur lors de la désactivation du mode autonome: {0}".format(repr(e)))

def wake_up_robot(session):
    motion_service = session.service("ALMotion")
    motion_service.wakeUp()

def stand_up_robot(session):
    posture_service = session.service("ALRobotPosture")
    posture_service.goToPosture("Stand", 0.5)
