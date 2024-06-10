# -*- coding: utf-8 -*-
from flask import Flask
from utils import init_db
from sqlalchemy import create_engine
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///content_data.db'
init_db(app)

from app import routes

engine = create_engine('sqlite:///content_data.db')
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
