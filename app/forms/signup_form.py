from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired(), Length(
        min=2, max=30, message='First name must be between 2 and 30 characters long.')])
    last_name = StringField('last_name', validators=[DataRequired(), Length(
        min=2, max=30, message='Last name must be between 2 and 30 characters long.')])
    username = StringField('username', validators=[DataRequired(), username_exists, Length(
        min=2, max=50, message='Username must be between 2 and 50 characters long.')])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    email_updates = BooleanField('email_updates')
    super_user = BooleanField('super_user')
    tier_id = StringField('tier_id', validators=[DataRequired()])
