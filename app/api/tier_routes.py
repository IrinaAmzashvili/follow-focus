from flask import Blueprint
from app.models import db, Tier

tier_routes = Blueprint('tiers', __name__)


@tier_routes.route('/')
def get_tiers():
    all_tiers = Tier.query.all()
    return {tier.id: tier.to_dict() for tier in all_tiers}
