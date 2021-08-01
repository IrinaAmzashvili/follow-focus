from flask import Blueprint
from app.models import db, Style

dance_style_routes = Blueprint('dance-styles', __name__)


@dance_style_routes.route('/')
def get_styles():
    all_styles = Style.query.all()
    return {style.id: style.to_dict() for style in all_styles}
