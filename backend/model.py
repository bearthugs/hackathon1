import scrapper
import string
import random
from decision_bot import get_songs, pick_song, pick_lyrics

online_users = dict()
online_rooms = dict()

class User:
    def __init__(self, username, top_songs, session_id):
        self.username = username
        self.top_songs = top_songs
        self.session_id = session_id #PK
        self.room_id = None
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

    def set_room_id(self, room_id):
        self.room_id = room_id

class Room:
    def __init__(self, session, time, no_questions, players, difficulty):
        characters = string.ascii_letters + string.digits
        self.id = (''.join(random.choices(characters, k=6))).upper()
        self.users = [session]
        self.owner = self.users[0]
        self.difficulty = difficulty #check data type and stuff
        self.time = time
        self.no_questions = no_questions
        self.questions = []
        self.answers = []
        self.players = players
        self.current = 0 #current question number, starting from 1
        

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
    
    def get_no_questions(self):
        return self.no_questions
    
    def union_songs(self):
        result = []
        for user in self.users:
            obj = online_users[user]
            result += obj.get_top_songs()
        return result
    
    def format_song_list(input_string):
        parts = input_string.split("), (")
        result = []
        for part in parts:
            cleaned_part = part.replace("(", "").replace(")", "").replace("'", "").strip()
            artist, song = cleaned_part.split(", ")
            result.append((artist, song))
        return result

    def set_questions(self): #called when the game is ready to start
        result = []
        union_ls = self.union_songs()
        song_list = get_songs(union_ls)
        formatted_ls = self.format_song_list(song_list)
        for song in formatted_ls:
            self.answers.append(song[0])
            lyrics = pick_lyrics(song)
            result.append(lyrics)

        self.questions = result #list of strings to display
    
    def get_question(self, num) -> str:
        return self.questions[num-1]

    def inc_question(self):
        self.current += 1
    
    def get_answer(self):
        return self.answers[self.current-1]

    

def create_room(session, players, time, difficulty, songs):
    room = Room(session, time, songs, players, difficulty)
    id = room.get_id()
    online_rooms[id] = room
    return id

def find_room(room_id, session_id):
    if room_id in online_rooms:
        room_obj = online_rooms.get(room_id)
        if room_obj.add_user(session_id) == -1: # If there are already 8 people in the room
            return -1
        else:
            user = online_users[session_id]
            user.set_room_id(room_id)
        return 1 # If the user has been successfully added to the room
    else:
        return 0 # The room does not exist


def get_authentication(): #user object
    username, tracks, session_id = scrapper.get_user_info()
    if session_id == False:
        return -1
    user = User(username, tracks, session_id)
    online_users[session_id] = user #save user into dictionary by session id
    return 0, session_id
    
    