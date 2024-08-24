import model
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# socketio = flask.SocketIO(app)

# @app.route('/')
# @app.route('/home')
# def get_index():
#     session_id = request.cookies.get('session_id')

@app.route('/authentication', methods=['GET', 'POST'])
def get_token():
    if request.method == 'POST': #button press
        data = request.json
        print(f"post request received {data}")
        if data['message'] == 'get authentication':
            rc = model.get_authentication()
            if rc == 0:
                response = {
                    "status": "success",
                    "message": "/home"
                }
            else:
                response = {
                    "status": "failed",
                    "message": "/authentication"
                }
            return jsonify(response)


@app.route('/test', methods=['GET'])
def text():
    print("hi")
    return jsonify({"message": "hello i work from flask"})

@app.route('/join_room', methods = ['GET', 'POST'])
def find_room():
    if request.method == 'POST': #button press
        '''
        The user has pressed the button after inserting the room code (room id)
        Get the room id from the message and search through the room objects
        to find the corresponding room
        '''
        data = request.json
        print(f"post request received {data}")


if __name__ == '__main__':
    app.run(debug=True)