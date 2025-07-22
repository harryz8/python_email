from marshmallow import Schema, fields
import email

class EmailSchema(Schema):
    email_from = fields.String()
    email_to = fields.String()
    subject = fields.String()
    content = fields.String()


class Email():
    email_from = None
    email_to = None 
    subject = None
    content = None
    def __init__(self, l_content : str, l_email : email.message.Message):
        self.email_from = l_email['From']
        self.email_to = l_email['To']
        self.subject = l_email['Subject']
        self.content = l_content