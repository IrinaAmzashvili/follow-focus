from .db import db
from .join_tables import likes, tutorial_tags


class Tutorial(db.Model):
    __tablename__ = 'tutorials'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    video_link = db.Column(db.Text, nullable=False)
    thumbnail_url = db.Column(db.Text)
    date = db.Column(db.DateTime, nullable=False)
    style_id = db.Column(db.Integer, db.ForeignKey('styles.id'),
                         nullable=False)
    level_id = db.Column(db.Integer, db.ForeignKey('levels.id'),
                         nullable=False)
    tier_id = db.Column(db.Integer, db.ForeignKey('tiers.id'), nullable=False)

    # one to many relationships - many side
    style = db.relationship('Style', backref='tutorials')
    level = db.relationship('Level', backref='tutorials')
    tier = db.relationship('Tier', backref='tutorials')

    # many to many relationships
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
            'thumbnailUrl': self.thumbnail_url,
            'date': self.date,
            'styleId': self.style_id,
            'levelId': self.level_id,
            'tierId': self.tier_id,
            'comments': [comment.id for comment in self.comments],
            'userLikes': [like.id for like in self.users],
            'tags': [tag.id for tag in self.tags],
        }

    def to_dict_with_comments(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'videoLink': self.video_link,
            'thumbnailUrl': self.thumbnail_url,
            'date': self.date,
            'styleId': self.style_id,
            'levelId': self.level_id,
            'tierId': self.tier_id,
            'comments': [comment.to_dict() for comment in self.comments],
            'userLikes': [like.id for like in self.users],
            'tags': [tag.id for tag in self.tags],
        }
