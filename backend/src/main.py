import flask
from flask_cors import CORS, cross_origin
from src.entities import user, entity, email_obj
from .mail import Mail
import datetime
from flask_httpauth import HTTPBasicAuth

app = flask.Flask(__name__)

CORS(app, supports_credentials=True, origins=['http://localhost:4200'])

auth = HTTPBasicAuth()
app.config['SECRET_KEY'] = 'aSecretKey'

entity.Base.metadata.create_all(entity.engine)


@auth.verify_password
def verify_password(l_username, l_password):
    session = entity.Session()
    if l_username is None or l_password is None:
        session.close()
        return False
    the_user = session.query(user.User).filter_by(username=l_username).first()
    if the_user is not None:
        if not the_user.check_password(l_password):
            session.close()
            return False
        session.close()
        return True
    session.close()
    return False


@app.route("/api/login", methods=['POST'])
def login():
    expiration = datetime.datetime.now() + datetime.timedelta(days = 30)
    session = entity.Session()
    json = flask.request.get_json()
    if json['id'] == None:
        json['id'] = 0
    posted_user = user.UserSchema().load(json)
    if posted_user['username'] is None or posted_user['password'] is None:
        session.close()
        return flask.abort(400, description="Password or Username is incorrect")
    the_user = session.query(user.User).filter_by(username=posted_user['username']).first()
    if the_user is not None:
        if the_user is None or not the_user.check_password(posted_user['password']):
            session.close()
            return flask.abort(400, description="Password or Username is incorrect")
        send_the_user = user.UserSchema().dump(user.SecureUser(the_user))
        session.close()
        return (flask.jsonify(send_the_user), 200)
    session.close()
    return flask.abort(400, description="Password or Username is incorrect")


@app.route('/api/register-user', methods=['POST'])
def register_user():
    session = entity.Session()
    json = flask.request.get_json()
    if json['id'] == None:
        json['id'] = 0
    else:
        flask.abort(400, description="ID shouldn't be provided")
    posted_user = user.UserSchema().load(json)
    if posted_user['username'] is None or posted_user['password'] is None:
        flask.abort(400, description="Username or Password is missing.")
    if session.query(user.User).filter_by(username=posted_user['username']).first() is not None:
        flask.abort(400, description="Username is taken.")
    new_user = user.User()
    new_user.username = posted_user['username']
    new_user.set_password(posted_user['password'])
    new_user.email_address = posted_user['email_address']
    new_user.email_password = posted_user['email_password']
    new_user.smtp_server = posted_user['smtp_server']
    new_user.smtp_port = posted_user['smtp_port']
    new_user.imap_server = posted_user['imap_server']
    session.add(new_user)
    session.commit()
    send_new_user = user.UserSchema().dump(user.SecureUser(new_user))
    print(f"ID: {new_user.id}")
    session.close()
    return (flask.jsonify(send_new_user), 201)


@app.route('/api/load-emails/<folder>', methods=['POST'])
@auth.login_required
def get_all_emails(folder="inbox"):
    session = entity.Session()
    the_user = session.query(user.User).filter_by(id=current_user.id).first()
    mail_manager = Mail(the_user.email_address, the_user.email_password, the_user.smtp_server, the_user.smtp_port, the_user.imap_server)
    mail_list = mail_manager.load_folder(folder, limit=10)
    send_email_list = [email_obj.EmailSchema().dump(single_mail) for single_mail in mail_list]
    return (flask.jsonify(send_email_list), 200)