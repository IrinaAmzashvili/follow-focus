from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from app.models import Comment


class CommentForm(FlaskForm):
    body = StringField('body', validators=[DataRequired(), Length(min=1, max=4000, message='Comment must bebetween 1 and 4000 characters long.')])
    user_id = StringField('user_id', validators=[DataRequired()])
    tutorial_id = StringField('tutorial_id', validators=[DataRequired()])
    created_at = StringField('created_at', validators=[DataRequired()])
