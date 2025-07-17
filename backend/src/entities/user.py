
import src.entities.entity
from sqlalchemy import Column, String, Integer
from marshmallow import Schema, fields
from flask_login import UserMixin
import hashlib


class User(UserMixin, src.entities.entity.Entity, src.entities.entity.Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String)
    password_hash = Column(String)
    email_address = Column(String)
    email_password = Column(String)
    smtp_server = Column(String)
    smtp_port = Column(Integer)
    imap_server = Column(String)

    def set_password(self, password):
        self.password_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()

    def check_password(self, password):
        return self.password_hash == hashlib.sha256(password.encode('utf-8')).hexdigest()


class UserSchema(Schema):
    id = fields.Integer()
    username = fields.String()
    password = fields.String()
    email_address = fields.String()
    email_password = fields.String()
    smtp_server = fields.String()
    smtp_port = fields.Integer()
    imap_server = fields.String()

class SecureUser():
    id = 0
    username = ''
    password = ''
    email_address = ''
    email_password = ''
    smtp_server = ''
    smtp_port = 0
    imap_server = ''
    def __init__(self, user : User):
        self.id = user.id
        self.username = user.username
        self.password = ''
        self.email_address = user.email_address
        self.email_password = user.email_password
        self.smtp_server = user.smtp_server
        self.smtp_port = user.smtp_port
        self.imap_server = user.imap_server