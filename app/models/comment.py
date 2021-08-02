from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    tutorial_id = db.Column(db.Integer, db.ForeignKey('tutorials.id'),
                            nullable=False)

    # one to many relationships - many side
    # user = db.relationship('User', backref=backref('comments', cascade='all, delete-orphan'))
    user = db.relationship('User', back_populates='comments')
    tutorial = db.relationship('Tutorial', back_populates='comments')
    # tutorial = db.relationship('Tutorial', backref=backref('comments', cascade='all, delete-orphan'))

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'userId': self.user_id,
            'tutorialId': self.tutorial_id,
        }
