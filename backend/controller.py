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

@app.route('/create_room')
def create_code():
    session_id = request.cookies.get('session_id')
    data = request.json
    print(f"post request received {data}")
    model.create_room(data['players'], data['time'], data['difficulty'], data['songs'])
    


@app.route('/test', methods=['GET'])
def text():
    print("hi")
    return jsonify({"message": "hello i work from flask"})

if __name__ == '__main__':
    app.run(debug=True)

