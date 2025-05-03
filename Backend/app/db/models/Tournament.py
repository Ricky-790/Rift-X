from mongoengine import (
    Document, 
    StringField, 
    DateTimeField, 
    FloatField,
    ListField, 
    ReferenceField
)

class Team(Document):
    """Simple Team model for tournaments"""
    name = StringField(required=True)
    captain = ReferenceField('User', required=True)
    members = ListField(ReferenceField('User'))
    
    meta = {
        'collection': 'teams'
    }

class Tournament(Document):
    """Simplified Tournament model for prototype"""
    title = StringField(required=True)
    organizer = ReferenceField('User', required=True)
    game = StringField(required=True)
    description = StringField(default='')
    start_date = DateTimeField(required=True)
    end_date = DateTimeField(required=True)
    prize_pool = FloatField(default=0.0)
    rules = StringField(default='')
    teams = ListField(ReferenceField('Team'))
    
    meta = {
        'collection': 'tournaments'
    }