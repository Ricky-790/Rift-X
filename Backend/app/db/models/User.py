from mongoengine import (
    Document,
    EmbeddedDocument,
    StringField,
    ListField,
    EmbeddedDocumentField,
)

class GameProfile(EmbeddedDocument):
    """Game profile"""
    Game = StringField(default='')
    IngameID = StringField(default='')
    rank = StringField(default='')
    role = StringField(default='')

class User(Document):
    """User Model"""
    WalletAddress = StringField(required=True, unique=True)
    UserName = StringField(required=True, unique=True)
    Profile_pic = StringField(default='')
    bio = StringField(default='Hello!')
    GameProfiles = ListField(EmbeddedDocumentField(GameProfile))
    meta = {'collection': 'User Data'}