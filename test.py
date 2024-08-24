import requests
from bs4 import BeautifulSoup

def get_lyrics(song_title):
    # Format the search query
    query = song_title.replace(' ', '+')
    
    # Send a request to the Genius search page
    search_url = f"https://genius.com/search?q={query}"
    response = requests.get(search_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find the first search result link
    song_link = soup.find('a', {'class': 'mini_card'})['href']
    
    # Send a request to the song page
    song_response = requests.get(song_link)
    song_soup = BeautifulSoup(song_response.text, 'html.parser')
    
    # Extract the lyrics
    lyrics_div = song_soup.find('div', {'data-lyrics-container': 'true'})
    lyrics = lyrics_div.get_text(separator='\n')
    
    return lyrics

# Example usage
song_title = "Hello by Adele"
lyrics = get_lyrics(song_title)
print(lyrics)
