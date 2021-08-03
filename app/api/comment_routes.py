from flask import Blueprint, request
from app.models import db, Comment
from app.forms import CommentForm
from .auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/', methods=['POST'])
def post_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment()
        form.populate_obj(comment)
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@comment_routes.route('/<int:id>', methods=['PUT'])
def update_tutorial(id):
    comment = Comment.query.get_or_404(id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.body = form.body.data
        db.session.commit()
        return comment.to_dict()
    return {'errors', validation_errors_to_error_messages(form.errors)}


@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get_or_404(id)
    db.session.delete(comment)
    db.session.commit()
    return {'success': True}
# now = datetime.datetime.today()
