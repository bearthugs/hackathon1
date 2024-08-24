import scrapper

class User:
    def __init__(self, username, token, top_songs, session_id):
        self.username = username
        self.token = token
        self.top_songs = top_songs
        self.session_id = session_id #PK
        self.score = 0
    
    def get_score(self):
        return self.score
    
    def increment_score(self):
        self.score += 1

class Room:
    def __init__(self, id, time, questions, players, difficulty):
        self.id = id
        self.users = []
        self.difficulty = difficulty #0 easy, 1 medium, 2 hard
        self.time = time
        self.questions = questions
        self.players = players
    


def get_authentication(): #user object
    access_token = scrapper.get_spotify_token()
    tracks = scrapper.get_top_artists(access_token)["items"]
    artist_names = [artist["name"] for artist in tracks]
    # user = new User()