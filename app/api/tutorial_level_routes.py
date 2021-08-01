from flask import Blueprint
from app.models import db, Level

tutorial_level_routes = Blueprint('tutorial-levels', __name__)


@tutorial_level_routes.route('/')
def get_levels():
    all_levels = Level.query.all()
    return {level.id: level.to_dict() for level in all_levels}
