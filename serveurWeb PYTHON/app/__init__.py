# -*- coding: utf-8 -*-
from flask import Flask
import os


app = Flask(__name__)

from app import routes