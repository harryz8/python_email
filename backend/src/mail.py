import smtplib
import email
import imaplib
from src.entities import email_obj
import threading

class Mail:
    _email_add = ""
    _password = ""
    _smtp_server = ""
    _smtp_port = 0
    _imap_server = ""
    inbox_emails: list[email_obj.Email] = []
    _inbox_emails_threading_lock = threading.Lock()
    _mail_server_lock = threading.Lock()

    def __init__(self, your_email_address : str, your_password : str, smtp_server : str, smtp_port : int, imap_server : str):
        self._email_add = your_email_address
        self._password = your_password
        self._smtp_server = smtp_server
        self._smtp_port = smtp_port
        self._imap_server = imap_server
        self.mail = imaplib.IMAP4_SSL(self._imap_server)
        self.mail.login(self._email_add, self._password)


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


    def load_folder(self, folder: str = "inbox", first : int = 0, number : int | None = None) -> list[email_obj.Email]:
        self.mail.select(folder)
        status, data = self.mail.search(None, 'ALL')
        mail_ids = []
        self.inbox_emails = []
        for block in data:
            mail_ids += block.split()
        if (number != None):
            mail_ids = mail_ids[first:first+number]
        else:
            mail_ids = mail_ids[first:]
        threads = {}
        for id_each in mail_ids:
            threads[id_each] = threading.Thread(target=self.get_email, args=(int(id_each), folder, True))
            threads[id_each].start()
        for id_each in mail_ids:
            threads[id_each].join()
        return self.inbox_emails
    

    def get_topline_folder(self, folder: str = "inbox"):
        emails: list[email_obj.Email] = []
        self._mail_server_lock.acquire()
        self.mail.select(folder)
        status, data = self.mail.search(None, 'All')
        mail_ids = []
        for block in data:
            mail_ids += block.split()
        for id_each in mail_ids:
            the_id = int(id_each)
            if (the_id > 0):
                status, data2 = self.mail.fetch(str(the_id), '(BODY.PEEK[HEADER])')
                for each_tuple in data2:
                    if isinstance(each_tuple, tuple):
                        msg = email.message_from_bytes(each_tuple[1])
                        emails.append(email_obj.Email(the_id, None, msg))
        self._mail_server_lock.release()
        return emails
    

    def get_email(self, email_id : int, folder : str = "inbox", is_thread = False) -> email_obj.Email | None:
        self._mail_server_lock.acquire()
        self.mail.select(folder)
        self.mail.search(None, 'ALL')
        status, data = self.mail.fetch(str(email_id), '(RFC822)')
        self._mail_server_lock.release()
        for each_tuple in data:
            if isinstance(each_tuple, tuple):
                    msg = email.message_from_bytes(each_tuple[1])
                    msg_body: str = ''
                    if msg.is_multipart():
                        for part in msg.get_payload():
                            charset = part.get_content_charset()
                            if part.get_content_type() == 'text/html':
                                msg_body += part.get_payload(decode=True).decode(charset)
                    else:
                        if (msg.get_content_type() == 'text/html'):
                            charset = msg.get_content_charset()
                            msg_body = msg.get_payload(decode=True).decode(charset)
                    if (is_thread):
                        self._inbox_emails_threading_lock.acquire()
                        self.inbox_emails.append(email_obj.Email(email_id, msg_body, msg))
                        self._inbox_emails_threading_lock.release()
                        return None
                    else:
                        return email_obj.Email(email_id, msg_body, msg)
        return None
            

    def close(self):
        self.mail.close()


if __name__ == "__main__":
    d = Mail("dh", "rzrm m_z_ __wz e_ur ", "smtp.gmail.com", 465, "imap.gmail.com")
    emails = d.load_folder(number=2)
    print(emails[1].content)
