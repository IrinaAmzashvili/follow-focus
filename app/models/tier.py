from .db import db


class Tier(db.Model):
    __tablename__ = 'tiers'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    img_url = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)

    users = db.relationship('User', back_populates='tier')
    tutorials = db.relationship('Tutorial', back_populates='tier')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'imgUrl': self.img_url,
            'description': self.description,
            'date': self.date,
            'subscribers': [user.id for user in self.users],
            'tutorials': [tutorial.id for tutorial in self.tutorials],
        }
