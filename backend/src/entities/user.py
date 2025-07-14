
import src.entities.entity
from sqlalchemy import Column, String
from marshmallow import Schema, fields
from flask_login import UserMixin
import hashlib


class User(UserMixin, src.entities.entity.Entity, src.entities.entity.Base):
    __tablename__ = 'user'
    username = Column(String)
    password_hash = Column(String)

    def __init__(self, l_username, l_password_hash=""):
        src.entities.entity.Entity.__init__(self)
        self.username = l_username
        self.password_hash = l_password_hash

    def set_password(self, password):
        self.password_hash = hashlib.sha256(bytes(password)).hexdigest()

    def check_password(self, password):
        return self.password_hash == hashlib.sha256(bytes(password)).hexdigest()


class UserSchema(Schema):
    id = fields.Number()
    username = fields.String()
    password_hash = fields.String()
