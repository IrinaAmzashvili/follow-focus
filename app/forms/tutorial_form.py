from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from app.models import Tutorial


class TutorialForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(
        min=3, max=200, message='Title must be between 3 and 200 characters.')])
    description = StringField('description', validators=[Length(
        max=6000, message='Title must be no more than 6000 characters.')])
    video_link = StringField('video_link', validators=[DataRequired()])
    thumbnail_url = StringField('thumbnail_url', validators=[DataRequired()])
    date = StringField('date', validators=[DataRequired()])
    style_id = StringField('style_id', validators=[DataRequired()])
    level_id = StringField('level_id', validators=[DataRequired()])
    tier_id = StringField('tier_id', validators=[DataRequired()])
