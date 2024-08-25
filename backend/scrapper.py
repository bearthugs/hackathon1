import base64
import webbrowser
import random
from urllib.parse import urlencode, urlparse, parse_qs
from http.server import BaseHTTPRequestHandler, HTTPServer
import requests
import re
from bs4 import BeautifulSoup
from lyricsgenius import Genius

class SpotifyAuthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        query_components = parse_qs(urlparse(self.path).query)
        self.server.auth_code = query_components.get('code', [None])[0]
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b'<html><body><script>window.close();</script></body></html>')

def get_spotify_token() -> str:
    client_id = "f3978bd3f66d4f679d14b9db2ae0dca7"
    client_secret = "93b2e83df0ab4e7990213daa5b7919cd"

    auth_headers = {
        "client_id": client_id,
        "response_type": "code",
        "redirect_uri": "http://localhost:7777/callback",
        "scope": "user-top-read"
    }

    webbrowser.open("https://accounts.spotify.com/authorize?" + urlencode(auth_headers))

    server_address = ('', 7777)
    httpd = HTTPServer(server_address, SpotifyAuthHandler)
    httpd.handle_request()

    auth_code = httpd.auth_code

    encoded_credentials = base64.b64encode(client_id.encode() + b':' + client_secret.encode()).decode("utf-8")

    token_headers = {
        "Authorization": "Basic " + encoded_credentials,
        "Content-Type": "application/x-www-form-urlencoded"
    }

    token_data = {
        "grant_type": "authorization_code",
        "code": auth_code,
        "redirect_uri": "http://localhost:7777/callback"
    }

    r = requests.post("https://accounts.spotify.com/api/token", data=token_data, headers=token_headers)

    return r.json()['access_token']

def get_top_tracks(access_token: str) -> dict:
    url = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.get(url, headers=headers)
    return response.json()

def get_prof_name(access_token: str) -> str:
    url = "https://api.spotify.com/v1/me"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.get(url, headers=headers)
    return response.json()['display_name']


def get_user_info() -> tuple[str, list, str]:
    top_tracks_names = []
    access_token = get_spotify_token()
    profile_name = get_prof_name(access_token)
    tracks = get_top_tracks(access_token)["items"]
    artist_track_tuples = [(artist['name'], track['name']) for track in tracks for artist in track['artists']]
    for artist, track in artist_track_tuples:
        top_tracks_names.append((artist, track))
    return profile_name, top_tracks_names

def format_artist(name: str) -> str:
    name = re.sub(r'[^a-z0-9 ]', '', name.lower()).strip()

    return name

def get_azlyrics_url(artist_name: str, song_title: str) -> str:
    artist_name = format_artist(artist_name)
    song_title = song_title.replace(" ", "").lower().strip()
    artist_name = artist_name.replace(" ", "").lower()
    url = f"https://www.azlyrics.com/lyrics/{artist_name}/{song_title}.html"
    return url

def get_genius_lyrics(artist_name: str, song_title: str) -> Genius:
    genius = Genius("5rJ8VNSRjcdslxEmrwtLwIqIYSwi5aHagreHHC43tPyOHP4vUgWeAuTpr1SHTiVe")
    song = genius.search_song(song_title, artist_name).lyrics
    return song

def format_song_lyrics(lyrics):
    ls = lyrics.split("\n")
    result = []
    i = 0
    for line in ls:
        if not line.startswith("[") and line != "" and i != 0:
            result.append(line)
        i += 1
    return result

def select_lyrics(ls, difficulty):
    if difficulty == 1:
        num = 5
    elif difficulty == 2:
        num = 3
    elif difficulty == 3:
        num = 1
    starting_index = random.randint(0, len(ls)-num)
    print(starting_index)
    selected_lines = ls[starting_index:starting_index+num]
    return "\n".join(selected_lines)


# def get_musixmatch_url(artist_name, song_title):
#     artist_name = artist_name.replace(" ", "-").lower()
#     song_title = song_title.replace(" ", "-").lower()
#     url = f"https://www.musixmatch.com/lyrics/{artist_name}/{song_title}"
#     return url

def get_lyrics_from_url(url: str) -> str:
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    lyrics_div = soup.find('div', class_=None, id=None)
    if lyrics_div is None:
        return None
    lyrics = lyrics_div.get_text(separator='\n')
    return lyrics.strip()

def get_lyrics(artist_name: str, song_title: str):
    sources = [
        get_azlyrics_url,
    ]

    song = get_genius_lyrics(artist_name, song_title)
    if song:
        return song.lyrics

    for source in sources:
        url = source(artist_name, song_title)

        lyrics = get_lyrics_from_url(url)
        if lyrics:
            return lyrics

    print("Could not find the lyrics on any of the sources.")
    return None

def format_lyrics(string: str):
    lines = list(filter(None, string.splitlines()))

    return lines





# Example usage
# artist_name = "(G)-Idle"
# song_title = "FATE"
# lyrics = get_lyrics(artist_name, song_title)
# lyrics = format_lyrics(lyrics)
# print(lyrics)
