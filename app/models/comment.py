from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    tutorial_id = db.Column(db.Integer, db.ForeignKey('tutorials.id'), nullable=False)

    user = db.relationship('User', back_populates='comments')
    tutorial = db.relationship('Tutorial', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'user': self.user,
            'tutorial': self.tutorial,
        }
