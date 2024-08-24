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
    session = request.cookies.get('session_id')
    if request.method == 'POST': #button press
        data = request.json
        print(f"post request received {data}")
        if data['message'] == 'get authentication':
            response = model.get_authentication(session)
            response = {
                "status": "success",
                "token": "dummy_token_123",
                "message": "Authentication successful"
            }
            return jsonify(response)


@app.route('/test', methods=['GET'])
def text():
    print("hi")
    return jsonify({"message": "hello i work from flask"})

if __name__ == '__main__':
    app.run(debug=True)

