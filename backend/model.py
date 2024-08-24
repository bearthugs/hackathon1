import scrapper
import string
import random

online_users = dict()

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
    def __init__(self, id, user, time, questions, players, difficulty):
        self.id = id
        self.users = [user]
        self.owner = self.users[0]
        self.difficulty = difficulty #0 easy, 1 medium, 2 hard
        self.time = time
        self.questions = questions
        self.players = players

    def get_id(self):
        return self.id

    def get_users(self):
        return self.users
    
    def add_user(self, user):
        self.users.append(user)
        self.players += 1

    def rmv_user(self, session_id):
        for user in self.users:
            if user.get_session_id == session_id:
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

def generate_random_string(length=6):
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choices(characters, k=length))
    return random_string    


def get_authentication(): #user object
    username, tracks, session_id = scrapper.get_user_info()
    if session_id == False:
        return -1
    user = User(username, tracks, session_id)
    online_users[session_id] = user #save user into dictionary by session id
    return 0
    
    