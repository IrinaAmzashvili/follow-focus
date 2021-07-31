from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Tutorial


class TutorialForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description')
    video_link = StringField('video_link', validators=[DataRequired()])
    thumbnail_url = StringField('thumbnail_url', validators=[DataRequired()])
    # date = StringField('date', validators=[DataRequired()])
    # style_id = StringField('style_id', validators=[DataRequired()])
    # level_id = StringField('level_id', validators=[DataRequired()])
    # tier_id = StringField('tier_id', validators=[DataRequired()])
