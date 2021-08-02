from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .join_tables import likes


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    email_updates = db.Column(db.Boolean, default=True)
    super_user = db.Column(db.Boolean, default=False)
    tier_id = db.Column(db.Integer, db.ForeignKey('tiers.id'), nullable=False)

    # one to many relationship - many side
    tier = db.relationship('Tier', backref='users')
    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')

    # many to many relationship
    tutorials = db.relationship('Tutorial', secondary=likes,
                                back_populates='users')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'username': self.username,
            'email': self.email,
            'emailUpdates': self.email_updates,
            'superUser': self.super_user,
            'tierId': self.tier_id,
            'comments': [comment.id for comment in self.comments],
            'likedVideos': [tutorial.to_dict() for tutorial in self.tutorials],
        }
