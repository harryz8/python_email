from marshmallow import Schema, fields
import email

class EmailSchema(Schema):
    email_from = fields.String()
    email_to = fields.String()
    subject = fields.String()
    content = fields.String()


class Email():
    email_from, email_to, subject, content = None
    def __init__(l_email : email.message.Message):
        email_from = l_email['From']
        email_to = l_email['To']
        subject = l_email['Subject']
        content = l_email.get_content()