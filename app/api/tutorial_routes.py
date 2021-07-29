from flask import Blueprint
from app.models import db, Tutorial

tutorial_routes = Blueprint('tutorial', __name__)


@tutorial_routes.route('/')
def get_tutorials():
    all_tutorials = Tutorial.query.all()
    return {'tutorials': [tutorial.to_dict() for tutorial in all_tutorials]}
