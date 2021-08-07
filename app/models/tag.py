from .db import db
from .join_tables import tutorial_tags


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    tag_type = db.Column(db.String, nullable=False)

    # many to many relationship
    tutorials = db.relationship('Tutorial', secondary=tutorial_tags,
                                back_populates='tags')

    def to_dict(self):
        return {
            'id': self.id,
            'tagType': self.tag_type,
            # 'tutorials': [tutorial.to_dict() for tutorial in self.tutorials],
            'tutorials': [tutorial.id() for tutorial in self.tutorials],
        }
