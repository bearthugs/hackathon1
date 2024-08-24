import model
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, emit, leave_room
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# pipe = init_pipeline()
socketio = SocketIO(app, cors_allowed_origins="*")
connected_users = {}

@app.route('/authentication', methods=['GET', 'POST'])
def get_token():
    if request.method == 'POST': #button press
        data = request.json
        print(f"post request received {data}")
        if data['message'] == 'get authentication':
            rc, token = model.get_authentication()
            if rc == 0:
                dict = {
                    "status": "success",
                    "message": "/home",
                    "token": token
                }
                response = make_response(jsonify(dict))
                response.set_cookie('session_id', token, path='/')

            else:
                response = {
                    "status": "failed",
                    "message": "/authentication"
                }
            return response

@app.route('/create_room', methods=['POST'])
def create_code():
    session_id = request.cookies.get('session_id')
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
            return make_response(jsonify(response), 400)
        elif rc == 1:
            # let them into the room
            message = "room/" + room_id
            response = {
                "status": "success",
                "message": message
            }
            return make_response(jsonify(response), 200)
        else:
            # don't let them into the room
            response = {
                "status": "failure",
                "message": "/join"
            }
            return make_response(jsonify(response), 404)


@socketio.on('connect')
def handle_connect():
    session_id = request.cookies.get('session_id')
    print(session_id)
    print('a user connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('user disconnected')

@socketio.on('test')
def handle_test(data):
    print("receiveddd")
    print('received test event with data:', data)
    emit('userjoin', {'text': 'yutfhhfhfhfh'})

#testing lyrics getting

# from decision_bot import init_pipeline, get_songs, pick_lyrics, pick_song
# from scrapper import get_user_info
#
# pipe = init_pipeline()
# name, songs = get_user_info()
# songs_list = get_songs(pipe, songs)
# song = pick_song(pipe, songs_list)
# lyrics = pick_lyrics(pipe, song)
# print(lyrics)




if __name__ == '__main__':
    socketio.run(app, port=5000, debug=True)