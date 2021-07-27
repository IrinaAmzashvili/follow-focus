from .db import db
from .join_tables import likes, tutorial_tags


class Tutorial(db.Model):
    __tablename__ = 'tutorials'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    video_link = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    style_id = db.Column(db.Integer, db.ForeignKey('styles.id'),
                         nullable=False)
    level_id = db.Column(db.Integer, db.ForeignKey('levels.id'),
                         nullable=False)
    tier_id = db.Column(db.Integer, db.ForeignKey('tiers.id'), nullable=False)

    style = db.relationship('Style', back_populates='tutorials')
    level = db.relationship('Level', back_populates='tutorials')
    tier = db.relationship('Tier', back_populates='tutorials')
    comments = db.relationship('Comment', back_populates='tutorial')

    users = db.relationship('User', secondary=likes,
                            back_populates='tutorials')
    tags = db.relationship('Tag', secondary=tutorial_tags,
                           back_populates='tutorials')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'videoLink': self.video_link,
            'style': self.style,
            'level': self.level,
            'tier': self.tier,
            'comments': [comment.id for comment in self.comments],
            'likes': [like.id for like in self.users],
            'tags': [tag.id for tag in self.tags],
        }
