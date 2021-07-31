from flask import Blueprint
from app.models import db, Tutorial
from .auth_routes import validation_errors_to_error_messages

tutorial_routes = Blueprint('tutorial', __name__)


@tutorial_routes.route('/')
def get_tutorials():
    all_tutorials = Tutorial.query.all()
    return {tutorial.id: tutorial.to_dict() for tutorial in all_tutorials}


@tutorial_routes.route('/<int:id>')
def get_one_tutorial(id):
    tutorial = Tutorial.query.get_or_404(id)
    return tutorial.to_dict()


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
        db.session.commit()
        return tutorial.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}
