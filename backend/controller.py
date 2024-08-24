import model
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, emit, leave_room
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, allow_credentials=True)
# pipe = init_pipeline()
socketio = SocketIO(app, cors_allowed_origins="*", allow_credentials=True)
connected_users = {}

@app.route('/authentication', methods=['GET', 'POST'])
def get_token():
    if request.method == 'POST': #button press
        data = request.json
        print(f"post request received {data}")
        if data['message'] == 'get authentication':
            rc = 0
            if rc == 0:
                dict = {
                    "status": "success",
                    "message": "/home",
                    "token": "token"
                }
                response = make_response(jsonify(dict))

            else:
                response = {
                    "status": "failed",
                    "message": "/authentication"
                }
            return response

@socketio.on('authenticated')
def handle_auth():
    print('setting sid')
    print(request.sid)
    emit('set_sid', request.sid)
    model.get_authentication(request.sid)

@app.route('/create_room', methods=['POST'])
def create_code():
    data = request.json
    session_id = data['sid']
    print(session_id)
    print(f"post request received {data}")
    return model.create_room(session_id, data['players'], data['time'], data['difficulty'], data['songs'])

@app.route('/test', methods=['GET'])
def text():
    print("hi")
    return jsonify({"message": "hello i work from flask"})

@app.route('/join', methods = ['GET', 'POST'])
def find_room():
    if request.method == 'POST': #button press
        data = request.json
        session_id = data['sid']
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
    session_id = request.sid
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



# UNCHECKED SOCKET FUNCTIONS THAT REALLY DON'T ACTUALLY WORK
@socketio.on('newUser') # a new user has successfuly joined a chat room
def handle_user_join():
    session_id = request.sid
    print(session_id)
    user_obj = model.online_users[session_id]
    username = user_obj.get_name()

    emit('userjoin', {'name': username}) # giving room.jsx the user's username

@socketio.on('startGame') # the game has started
def handle_game_start(data):
    room_id = data
    room_obj = model.online_rooms[room_id]
    question = room_obj.get_question()
    
    emit('firstQuestion', {'question': question}) # giving game.jsx the first question

@socketio.on('input')
def handle_input(data):
    room_id = data['room_id']
    session_id = data['session_id']
    answer = data['message']

    rc = model.check_answer(room_id, session_id, answer)

    if rc == 1: # the correct answer was given
        user_obj = model.online_users[session_id]
        user_obj.increment_score()
        username = user_obj.get_username()
        score = user_obj.get_score()
        room_obj = model.online_rooms[room_id]
        question = room_obj.get_question() 

        # Need to check if this is the last question
        current = room_obj.get_current()
        no_question = room_obj.get_no_questions()

        if current + 1 == no_question:
            winners = model.get_winner(room_id)
            emit('gameOver', {'winner', winners})
        else:
            emit('nextQuestion', {'next': question,
                                'username': username,
                                'score': score})
    else: # the answer was wrong
        emit('wrongAnswer')

@socketio.on('timeout')
def handle_timeout(data):
    room_id = data
    room_obj = model.online_rooms[room_id]
    room_obj.inc_question()
    question = room_obj.get_question()
    current = room_obj.get_current()
    no_question = room_obj.get_no_questions()
    # Need to check if this is the last question
    if current + 1 == no_question:
            winners = model.get_winner(room_id)
            emit('gameOver', {'winner', winners})
    else:
        emit('nextQuestion', {'next': question,
                            'username': None,
                            'score': 0})

@socketio.on('endGame')
def handle_endGame(data):
    room_id = data
    del model.online_rooms[room_id]



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