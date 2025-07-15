import flask
from flask_cors import CORS
from flask_login import LoginManager, current_user, logout_user, login_user
from src.entities import entity, user

app = flask.Flask(__name__)

CORS(app)
login = LoginManager(app)


@login.user_loader
def load_user(l_id):
    return entity.Session.get(user.User, int(l_id))


@app.route("/api/login", methods=['GET'])
def login():
    if current_user.is_authenticated:
        return flask.redirect("/")
    username = flask.request.json.get('username')
    password = flask.request.json.get('password')
    if username is None or password is None:
        return flask.abort(400, description="Password or Username is incorrect")
    the_user = user.User.query.filter_by(username=username).first()
    if the_user is not None:
        if the_user is None or not the_user.check_password(password):
            return flask.abort(400, description="Password or Username is incorrect")
        login_user(the_user)
        return flask.jsonfiy({username: the_user.username}), 200
    return flask.abort(400, description="Password or Username is incorrect")


@app.route('/api/logout')
def logout():
    logout_user()
    return flask.redirect('/')


@app.route('/api/register_user')
def register_user():
    username = flask.request.json.get('username')
    password = flask.request.json.get('password')
    if username is None or password is None:
        flask.abort(400)
    if user.User.query.filter_by(username=username).first() is not None:
        flask.abort(400)
    new_user = user.User(l_username=username)
    new_user.set_password(password)
    entity.Session.add(new_user)
    entity.Session.commit()
    return (flask.jsonify({'username': new_user.username}), 201,
            {'Location': flask.url_for('get_user', id=new_user.id, _external=True)})
