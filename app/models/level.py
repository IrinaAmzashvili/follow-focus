from .db import db


class Level(db.Model):
    __tablename__ = 'levels'

    id = db.Column(db.Integer, primary_key=True)
    level_type = db.Column(db.String(30), nullable=False)

    tutorials = db.relationship('Tutorial', back_populates='level')

    def to_dict(self):
        return {
            'id': self.id,
            'levelType': self.level_type,
            'tutorials': [tutorial.id for tutorial in self.tutorials],
        }
