import entity
from sqlalchemy import Column, String
from marshmallow import Schema, fields


class User(entities.Entity, entities.Base):
    __tablename__ = 'user'
    first_name = Column(String)
    surname = Column(String)
    password = Column(String)

    def __init__(self, l_first_name, l_surname, l_password):
        entities.Entity.__init__(self)
        self.first_name = l_first_name
        self.surname = l_surname
        self.password = l_password


class UserSchema(Schema):
    id = fields.Number()
    first_name = fields.String()
    surname = fields.String()
    password = fields.String()
