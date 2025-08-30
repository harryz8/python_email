from marshmallow import Schema, fields
import email
from email.header import decode_header

class EmailSchema(Schema):
    id = fields.Integer()
    email_from = fields.String()
    email_to = fields.String()
    subject = fields.String()
    content = fields.String()


class Email():
    id = 0
    email_from = ''
    email_to = '' 
    subject = ''
    content = ''
    def __init__(self, email_id : int, l_content : str | None, l_email : email.message.Message):
        if (l_email['From'] != None):
            decoded_from = decode_header(l_email['From'])[0]
            if isinstance(decoded_from, bytes):
                for decoded_email_from, from_charset in [decoded_from]:
                    self.email_from = decoded_email_from.decode(from_charset)
            else:
                self.email_from = decoded_from[0]
        if (l_email['To'] != None):
            decoded_to = decode_header(l_email['To'])[0]
            if isinstance(decoded_to, bytes):
                for decoded_email_to, to_charset in [decoded_to]:
                    self.email_to = decoded_email_to.decode(to_charset)
            else:
                self.email_to = decoded_to[0]
        if (l_email['Subject'] != None):
            decoded_subject = decode_header(l_email['Subject'])[0]
            if isinstance(decoded_subject, bytes):
                for decoded_email_subject, subject_charset in [decoded_subject]:
                    self.subject = decoded_email_subject.decode(subject_charset)
            else:
                self.subject = decoded_subject[0]
        if (l_content != None):
            self.content = l_content
        self.id = email_id