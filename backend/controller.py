import model
import flask 

app = flask.Flask(__name__, static_url_path='/static')
app.config['SERVER_SOFTWARE'] = False
# socketio = flask.SocketIO(app)

@app.route('/')
@app.route('/home')
def get_index():
    session_id = flask.request.cookies.get('session_id')
    