import scrapper
import string
import random

online_users = dict()
online_rooms = dict()

class User:
    def __init__(self, username, top_songs, session_id):
        self.username = username
        self.top_songs = top_songs
        self.session_id = session_id #PK
        self.score = 0
    
    def get_username(self):
        return self.username
    
    def get_top_songs(self):
        return self.top_songs
    
    def get_session_id(self):
        return self.session_id

    def get_score(self):
        return self.score
    
    def increment_score(self):
        self.score += 1

    def reset_score(self):
        self.score = 0

class Room:
    def __init__(self, session, time, questions, players, difficulty):
        characters = string.ascii_letters + string.digits
        self.id = ''.join(random.choices(characters, k=6))
        self.users = [session]
        self.owner = self.users[0]
        self.difficulty = difficulty #check data type and stuff
        self.time = time
        self.questions = questions
        self.players = players

    def get_id(self):
        return self.id

    def get_users(self):
        return self.users
    
    def add_user(self, session):
        if len(self.users) == 8:
            return -1
        self.users.append(session)
        self.players += 1

    def rmv_user(self, session_id):
        if len(self.users == 1):
            return -1
        for user in self.users:
            if user == session_id:
                self.users.remove(user)
            break
        self.players -= 1

    def get_owner(self):
        return self.owner

    def get_difficulty(self):
        return self.difficulty
    
    def get_time(self):
        return self.time
    
    def set_time(self, time):
        self.time = time
    
    def get_questions(self):
        return self.questions
    
    def set_questions(self, questions):
        self.questions = questions

def create_room(session, players, time, difficulty, songs):
    room = Room(session, time, songs, players, difficulty)
    id = room.get_id()
    online_rooms[id] = room
    return id


def get_authentication(): #user object
    username, tracks, session_id = scrapper.get_user_info()
    if session_id == False:
        return -1
    user = User(username, tracks, session_id)
    online_users[session_id] = user #save user into dictionary by session id
    return 0, session_id
    
    