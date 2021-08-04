from .db import db

likes = db.Table(
    'likes',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id',
              ondelete='CASCADE'), primary_key=True),
    db.Column('tutorial_id', db.Integer, db.ForeignKey('tutorials.id',
              ondelete="CASCADE"), primary_key=True)
)


tutorial_tags = db.Table(
    'tutorial_tags',
    db.Column('tutorial_id', db.Integer, db.ForeignKey('tutorials.id',
              ondelete='CASCADE'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id',
              ondelete='CASCADE'), primary_key=True)
)
