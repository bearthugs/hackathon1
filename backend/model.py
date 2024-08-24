from flask import render_template

def index(session_id):
    '''
        index
        Returns the view for the index
    '''
    if session_id != None:
        username = user_details(session_id)
        return page_view("index", "loggedin_header", name=username)
    return page_view("index")