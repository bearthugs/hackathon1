import scrapper
import string
import random
from decision_bot import get_songs, pick_song, pick_lyrics
from flask_socketio import join_room
import scrapper

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

    def get_room_id(self):
        return self.room_id

class Room:
    def __init__(self, session, time, no_questions, players, difficulty):
        characters = string.ascii_letters + string.digits
        self.id = (''.join(random.choices(characters, k=6))).upper()
        self.users = [session]
        self.owner = self.users[0]
        self.difficulty = difficulty #check data type and stuff
        self.time = time
        self.no_questions = no_questions
        self.questions = [] # list of strings of the lyrics
        self.answers = []   # list of strings containing the answers // the song names
        self.players = players
        self.current_players = 0
        self.current = 0 #current question number, starting from 1

        user = online_users[session]
        user.set_room_id(self.id)
        

    def get_id(self):
        return self.id

    def get_users(self):
        return self.users

    def add_user(self, session):
        if len(self.users) >= self.players:
            return -1
        self.users.append(session)
        self.current_players += 1
        return 1

    def rmv_user(self, session_id):
        if len(self.users) == 1:
            return -1
        self.users.remove(session_id)
        self.current_players -= 1
        return 1

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

    def set_questions(self, pipe): #called when the game is ready to start
        result1 = []
        union_ls = self.union_songs()
        song_list = get_songs(pipe, union_ls)
        song_list = song_list.split("), (")
        result2 = []
        for part in song_list:
            cleaned_part = part.replace("(", "").replace(")", "").replace("'", "").strip()
            artist, song = cleaned_part.split(", ")
            result2.append((artist, song))

        for song in result2:
            self.answers.append(song[0])
            lyrics = scrapper.get_genius_lyrics(song[0], song[1])
            lyrics = scrapper.format_song_lyrics(lyrics)
            lyrics = scrapper.select_lyrics(lyrics, self.difficulty)
            result1.append(lyrics)

        self.questions = result1 #list of strings to display
    
    def get_question(self) -> str:
        return 'LYRICS ADITI'

    def inc_question(self):
        self.current += 1

    def get_current(self):
        return self.current
    
    def get_answer(self):
        return self.answers[self.current]

'''
we get the session_id (user),
answer input from user,
room_id for room
'''

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
    return 0 # The room does not exist
    
def check_answer(room_id, session_id, user_answer):
    room_obj = online_rooms.get(room_id)
    correct_answer = room_obj.get_answer()
    if correct_answer == user_answer:
        user_obj = online_users.get(session_id)
        user_obj.increment_score()
        room_obj.inc_question() # might not need this
        return 1
    return 0

def get_winner(room_id):
    room_obj = online_rooms.get(room_id)
    user_ids = room_obj.get_users()
    user_obj_ls = []
    for session_id in user_ids:
        user_obj_ls.append(online_users[session_id])
    winners = []
    max_score = 0
    for user in user_obj_ls:
        if user.get_score() >= max_score:
            if user.get_score() > max_score:
                winners.clear()
                max_score = user.get_score()
            winners.append(user.get_username())
    return [winners, max_score]


def get_authentication(session_id): #user object
    username, tracks= scrapper.get_user_info()
    user = User(username, tracks, session_id)
    online_users[session_id] = user #save user into dictionary by session id
    return
    
    