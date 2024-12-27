from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///school.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    id_group = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=False)


class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(10), unique=True, nullable=False)


class Assignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    exercise_number = db.Column(db.Integer, nullable=False)
    assignment_tag = db.Column(db.String(100), nullable=False)


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_student = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    id_assignment = db.Column(db.Integer, db.ForeignKey('assignment.id'), nullable=False)
    id_group = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=False)
    CE1 = db.Column(db.Float, nullable=True)
    CE2 = db.Column(db.Float, nullable=True)
    CE3 = db.Column(db.Float, nullable=True)
    CE4 = db.Column(db.Float, nullable=True)
    CE5 = db.Column(db.Float, nullable=True)
    CE6 = db.Column(db.Float, nullable=True)
    CE7 = db.Column(db.Float, nullable=True)
    CE8 = db.Column(db.Float, nullable=True)
    CE9 = db.Column(db.Float, nullable=True)
    CE10 = db.Column(db.Float, nullable=True)

