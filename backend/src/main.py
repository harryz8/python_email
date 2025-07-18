import flask
from flask_cors import CORS, cross_origin
from flask_login import LoginManager, current_user, logout_user, login_user
from src.entities import user, entity

app = flask.Flask(__name__)

CORS(app)
login = LoginManager(app)
app.config['SECRET_KEY'] = 'aSecretKey'

entity.Base.metadata.create_all(entity.engine)


@login.user_loader
def load_user(l_id):
    session = entity.Session()
    return session.get(user.User, int(l_id))


@app.route("/api/login", methods=['POST'])
def login():
    session = entity.Session()
    if current_user.is_authenticated:
        return flask.redirect("/")
    json = flask.request.get_json()
    if json['id'] == None:
        json['id'] = 0
    posted_user = user.UserSchema().load(json)
    if posted_user['username'] is None or posted_user['password'] is None:
        return flask.abort(400, description="Password or Username is incorrect")
    the_user = session.query(user.User).filter_by(username=posted_user['username']).first()
    if the_user is not None:
        if the_user is None or not the_user.check_password(posted_user['password']):
            return flask.abort(400, description="Password or Username is incorrect")
        login_user(the_user)
        send_the_user = user.UserSchema().dump(user.SecureUser(the_user))
        return (flask.jsonify(send_the_user), 200)
    return flask.abort(400, description="Password or Username is incorrect")


@app.route('/api/logout')
def logout():
    logout_user()
    return flask.redirect('/')


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
    session.close()
    return (flask.jsonify(send_new_user), 201)
