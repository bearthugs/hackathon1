import model
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, emit, leave_room

app = Flask(__name__)
CORS(app)

socketio = SocketIO(app)
connected_users = {}

@app.route('/authentication', methods=['GET', 'POST'])
def get_token():
    if request.method == 'POST': #button press
        data = request.json
        print(f"post request received {data}")
        if data['message'] == 'get authentication':
            rc, token = model.get_authentication()
            if rc == 0:
                response = {
                    "status": "success",
                    "message": "/home",
                    "token": token
                }
            else:
                response = {
                    "status": "failed",
                    "message": "/authentication"
                }
            return jsonify(response)

@app.route('/create_room', methods=['POST'])
def create_code():
    session_id = request.cookies.get('session_id')
    print(session_id)
    data = request.json
    print(f"post request received {data}")
    return model.create_room(session_id, data['players'], data['time'], data['difficulty'], data['songs'])
    


@app.route('/test', methods=['GET'])
def text():
    print("hi")
    return jsonify({"message": "hello i work from flask"})

@app.route('/join', methods = ['GET', 'POST'])
def find_room():
    if request.method == 'POST': #button press
        session_id = request.cookies.get('session_id')
        data = request.json
        print(f"post request received {data}")
        room_id = data['room_id']
        rc = model.find_room(room_id, session_id)
        if rc == -1:
            response = {
            "status": "room full",
            "message": "/join"
            }
        elif rc == 1:
            # let them into the room
            message = "room/" + room_id
            response = {
                "status": "success",
                "message": message
            }
        else:
            # don't let them into the room
            response = {
                "status": "failure",
                "message": "/join"
            }
        return jsonify(response)

@socketio.on('connect')
def connect():
    session_id = request.cookies.get('session_id')
    # room_id = user_id
    
    # emit("init_room_id", room_id)


if __name__ == '__main__':
    app.run(debug=True)