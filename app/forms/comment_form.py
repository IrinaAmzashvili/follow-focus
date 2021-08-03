from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Comment


class CommentForm(FlaskForm):
    body = StringField('body', validators=[DataRequired()])
    user_id = StringField('user_id', validators=[DataRequired()])
    tutorial_id = StringField('tutorial_id', validators=[DataRequired()])
    created_at = StringField('created_at', validators=[DataRequired()])
