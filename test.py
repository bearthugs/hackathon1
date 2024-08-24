import requests
import re
from bs4 import BeautifulSoup

def format_artist(name):
    name = re.sub(r'[^a-z0-9]', '', name.lower())
    return name

def get_azlyrics_url(artist_name, song_title):
    artist_name = format_artist(artist_name)
    song_title = song_title.replace(" ", "").lower()
    
    url = f"https://www.azlyrics.com/lyrics/{artist_name}/{song_title}.html"
    return url

def get_lyrics(artist_name, song_title):
    url = get_azlyrics_url(artist_name, song_title)
    response = requests.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')
    lyrics_div = soup.find('div', class_=None, id=None)
    if lyrics_div is None:
        print("Could not find the lyrics on the page.")
        return None

    lyrics = lyrics_div.get_text(separator='\n')
    
    return lyrics.strip()

def format_lyrics(string):
    lines = list(filter(None, string.splitlines()))

    return lines


# Example usage
artist_name = "(G)-Idle"
song_title = "FATE"
lyrics = get_lyrics(artist_name, song_title)
lyrics = format_lyrics(lyrics)
# print(lyrics)
