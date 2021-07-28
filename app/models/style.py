from .db import db


class Style(db.Model):
    __tablename__ = 'styles'

    id = db.Column(db.Integer, primary_key=True)
    dance_style = db.Column(db.String(30), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'danceStyle': self.dance_style,
            'tutorials': [tutorial.to_dict() for tutorial in self.tutorials],
        }
