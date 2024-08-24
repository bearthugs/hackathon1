import flask_socketio
from flask import request
from flask_socketio import join_room, emit, leave_room
from flask_login import current_user, AnonymousUserMixin

# try:
#     from __main__ import socketio
# except ImportError:
#     from controller import socketio
#
# @socketio.on('connect')
# def connect():
#     session_id = request.cookies.get('session_id')
#     join_room(session_id)
#     print("Client connected, session_id:", session_id)
#     emit('userjoin', {"text": 'yutfhhfhfhfh'})
#
# @socketio.on("test")
# def test(data):
#     print("Received test event with data:", data)
#     emit('test', {"text": 'yutfhhfhfhfh'})