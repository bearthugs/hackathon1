import base64
import webbrowser
from urllib.parse import urlencode, urlparse, parse_qs
import requests
from http.server import BaseHTTPRequestHandler, HTTPServer

class SpotifyAuthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        query_components = parse_qs(urlparse(self.path).query)
        self.server.auth_code = query_components.get('code', [None])[0]
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b'Authorization code received. You can close this window.')

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

def get_top_artists(access_token):
    url = "https://api.spotify.com/v1/me"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.get(url, headers=headers)
    return response.json()

def main():
    access_token = get_spotify_token()
    print(access_token)
    tracks = get_top_artists(access_token)["items"]
    artist_names = [artist["name"] for artist in tracks]
    print(artist_names)

if __name__ == "__main__":
    main()