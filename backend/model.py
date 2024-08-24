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
    


def index(session_id):
    '''
        index
        Returns the view for the index
    '''
    if session_id != None:
        username = user_details(session_id)
        return page_view("index", "loggedin_header", name=username)
    return page_view("index")