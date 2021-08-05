from flask import Blueprint, request
from sqlalchemy import desc
from flask_login import current_user
from app.models import db, Tutorial
from .auth_routes import validation_errors_to_error_messages
from app.forms import TutorialForm

tutorial_routes = Blueprint('tutorials', __name__)


@tutorial_routes.route('/')
def get_tutorials():
    # query for tutorials that match user tier id
    if current_user.tier_id == 1:
        tier = [1]
    elif current_user.tier_id == 2:
        tier = [1, 2]
    elif current_user.tier_id == 3:
        tier = [1, 2, 3]
    elif current_user.tier_id == 4:
        tier = [1, 2, 3, 4]
    elif current_user.tier_id == 5:
        tier = [1, 2, 3, 4, 5]

    all_tutorials = Tutorial.query.filter(Tutorial.tier_id.in_(tier)).all()
    return {tutorial.id: tutorial.to_dict() for tutorial in all_tutorials}


@tutorial_routes.route('/<int:id>')
def get_one_tutorial(id):
    tutorial = Tutorial.query.get_or_404(id)
    return tutorial.to_dict_with_comments()


@tutorial_routes.route('/', methods=['POST'])
def create_tutorial():
    form = TutorialForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        tutorial = Tutorial()
        form.populate_obj(tutorial)
        db.session.add(tutorial)
        db.session.commit()
        return tutorial.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@tutorial_routes.route('/<int:id>', methods=['PUT'])
def update_tutorial(id):
    tutorial = Tutorial.query.get_or_404(id)
    form = TutorialForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        tutorial.title = form.title.data,
        tutorial.description = form.description.data,
        tutorial.video_link = form.video_link.data,
        tutorial.thumbnail_url = form.thumbnail_url.data
        tutorial.date = form.date.data
        tutorial.style_id = form.style_id.data
        tutorial.level_id = form.level_id.data
        tutorial.tier_id = form.tier_id.data
        db.session.commit()
        return tutorial.to_dict_with_comments()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@tutorial_routes.route('/<int:id>', methods=['DELETE'])
def delete_tutorial(id):
    tutorial = Tutorial.query.get_or_404(id)
    db.session.delete(tutorial)
    db.session.commit()
    return {'success': True}
