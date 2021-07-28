from .db import db


class Level(db.Model):
    __tablename__ = 'levels'

    id = db.Column(db.Integer, primary_key=True)
    level_type = db.Column(db.String(30), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'levelType': self.level_type,
            'tutorials': [tutorial.to_dict() for tutorial in self.tutorials],
        }
