import model
import flask 
import database

app = flask.Flask(__name__, static_url_path='/static')
app.config['SERVER_SOFTWARE'] = False
# database.db_init()

# socketio = flask.SocketIO(app)

@app.route('/')
@app.route('/home')
def get_index():
    session_id = flask.request.cookies.get('session_id')
    