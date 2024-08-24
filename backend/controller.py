import model
from flask import Flask, request, jsonify
from flask_cors import CORS
# import database

app = Flask(__name__)
CORS(app)
# database.db_init()

# socketio = flask.SocketIO(app)

@app.route('/')
@app.route('/home')
def get_index():
    session_id = request.cookies.get('session_id')

@app.route('/authentication')
def get_token(message):
    print(f"post request received {message}")

@app.route('/test', methods=['GET'])
def text():
    print("hi")
    return jsonify({"message": "hello i work from flask"})

if __name__ == '__main__':
    app.run(debug=True)

