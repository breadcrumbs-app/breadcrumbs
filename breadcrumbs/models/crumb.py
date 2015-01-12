from datetime import datetime

from .shared import db

class Crumb(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    def __init__(self, user_id, latitude, longitude, timestamp):
        self.user_id = user_id
        self.latitude = latitude
        self.longitude = longitude
        self.timestamp = datetime.fromtimestamp(timestamp)

    def __repr__(self):
        return '<Crumb %i>' % self.id
