from utils import db

class Presentation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    content = db.relationship('Content', backref='presentation', lazy=True)

class Content(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    value = db.Column(db.Text, nullable=False)
    presentation_id = db.Column(db.Integer, db.ForeignKey('presentation.id'), nullable=False)
