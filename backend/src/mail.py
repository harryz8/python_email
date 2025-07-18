import smtplib
import email
import imaplib

class Mail:
    _email_add = ""
    _password = ""
    _smtp_server = ""
    _smtp_port = 0
    _imap_server = ""

    def __init__(self, your_email_address : str, your_password : str, smtp_server : str, smtp_port : int, imap_server : str):
        self._email_add = your_email_address
        self._password = your_password
        self._smtp_server = smtp_server
        self._smtp_port = smtp_port
        self._imap_server = imap_server

    def send(self, to_email : list[str], subject : str, body : str):
        for i in to_email:
            msg = email.message.EmailMesssage()
            msg['Subject'] = subject
            msg['From'] = self._email_add
            msg['To'] = i
            msg.set_content(body)
            with smtplib.SMTP_SSL(self._smtp_server, self._smtp_port) as send_device:
                send_device.login(self._email_add, self._password)
                send_device.send_message(msg)
                send_device.quit()

    def load_folder(self, folder: str = "inbox") -> list[tuple[str, email.message.Message]]:
        emails: list[tuple[str, email.message.Message]] = []
        mail = imaplib.IMAP4_SSL(self._imap_server)
        mail.login(self._email_add, self._password)
        mail.select(folder)
        status, data = mail.search(None, 'ALL')
        mail_ids = []
        for block in data:
            mail_ids += block.split()
        for id_each in mail_ids:
            status, data = mail.fetch(id_each, '(RFC822)') #'(RFC822)' is the whole raw message
            for each_tuple in data:
                if isinstance(each_tuple, tuple):
                    msg = email.message_from_bytes(each_tuple[1])
                    msg_body: str = ''
                    if msg.is_multipart():
                        for part in msg.get_payload():
                            if part.get_content_type() == 'text/plain':
                                msg_body += part.get_payload()
                    else:
                        msg_body = msg.get_payload()
                    emails.append((msg_body, msg))

        return emails


if __name__ == "__main__":
    d = Mail("dh", "rzrm m_z_ __wz e_ur ", "smtp.gmail.com", 465, "imap.gmail.com")
    d.load_folder()
