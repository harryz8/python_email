import flask
from flask_cors import CORS
from flask_login import LoginManager, current_user, logout_user, login_user
from src.entities import entity, user

app = flask.Flask(__name__)

CORS(app)
login = LoginManager(app)


@login.user_loader
def load_user(l_id):
    return Session.get(User, int(l_id))


@app.route("/api/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return flask.redirect("/")
    # form = LoginForm()
    # if form.validate_on_submit():
    #     pass


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
    if User.query.filter_by(username=username).first() is not None:
        flask.abort(400)
    new_user = User(l_username=username)
    new_user.set_password(password)
    Session.add(new_user)
    Session.commit()
    return (flask.jsonify({'username': new_user.username}), 201,
            {'Location': flask.url_for('get_user', id=new_user.id, _external=True)})
