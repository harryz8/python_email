from marshmallow import Schema, fields, pre_dump
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
            if isinstance(decoded_from[0], bytes):
                for decoded_email_from, from_charset in [decoded_from]:
                    # self.email_from = decoded_email_from.decode('utf-8', errors='replace')
                    if (from_charset == None):
                        from_charset = 'utf-8'
                    self.email_from = decoded_email_from.decode(from_charset)
            else:
                charset = decoded_from[1]
                if (charset == None):
                        charset = 'utf-8'
                self.email_from = decoded_from[0].encode(charset).decode('utf-8', errors='replace')
        if (l_email['To'] != None):
            decoded_to = decode_header(l_email['To'])[0]
            if isinstance(decoded_to[0], bytes):
                for decoded_email_to, to_charset in [decoded_to]:
                    # self.email_to = decoded_email_to.decode('utf-8', errors='replace')
                    if (to_charset == None):
                        to_charset = 'utf-8'
                    self.email_to = decoded_email_to.decode(to_charset)
            else:
                charset = decoded_to[1]
                if (charset == None):
                        charset = 'utf-8'
                self.email_to = decoded_to[0].encode(charset).decode('utf-8', errors='replace')
        if (l_email['Subject'] != None):
            decoded_subject = decode_header(l_email['Subject'])[0]
            if isinstance(decoded_subject[0], bytes):
                for decoded_email_subject, subject_charset in [decoded_subject]:
                    # self.subject = decoded_email_subject.decode('utf-8', errors='replace')
                    if (subject_charset == None):
                        subject_charset = 'utf-8'
                    self.subject = decoded_email_subject.decode(subject_charset)
            else:
                charset = decoded_subject[1]
                if (charset == None):
                        charset = 'utf-8'
                self.subject = decoded_subject[0].encode(charset).decode('utf-8', errors='replace')
        if (l_content != None):
            self.content = l_content
        self.id = email_id