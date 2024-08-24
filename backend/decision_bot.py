import torch
from scrapper import get_lyrics, format_lyrics
from transformers import pipeline
from huggingface_hub import login


def init_pipeline():

    login("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")

    mps_device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

    pipe = pipeline(
        "text-generation",
        model="google/gemma-2-2b-it",
        max_length=800,
        device=mps_device,
    )

    if torch.backends.mps.is_available():
        print("Loading model into MPS device...")
        pipe.model = pipe.model.to(mps_device)

    return pipe

def get_songs(track_list):
    messages = [
        {"role": "user", "content": f"Can you pick 10 random songs from these tracks, and give them in the format of ('artist_name', 'song_name') with saying anything else, just the list of songs, with no pre-amble while also randomising the order: {track_list}"},
    ]

    output = pipe(messages)
    assistant_output = ""
    for item in output[0]['generated_text']:
        if item['role'] == 'assistant':
            assistant_output = item['content']
            break
    return assistant_output

def pick_lyrics(song):
    chosen_song = [part.replace('(', '').replace("'", '').replace(')', '') for part in song.split(', ')]
    lyrics = get_lyrics(chosen_song[0], chosen_song[1])
    lyrics = format_lyrics(lyrics)
    messages = [
        {"role": "user", "content": f"Can you pick out a random line from the lyrics of the song without any extra symbols, and without any preamble: {lyrics}"},
    ]
    output = pipe(messages)
    assistant_output = ""
    for item in output[0]['generated_text']:
        if item['role'] == 'assistant':
            assistant_output = item['content']
            break
    return assistant_output

def pick_song(song_list):
    messages = [
        {"role": "user", "content": f"Can you pick out a random song and its artist from the list of songs without any extra symbols, in the format of ('artist_name', 'song_name') and without any preamble: {song_list}"},
    ]
    output = pipe(messages)
    assistant_output = ""
    for item in output[0]['generated_text']:
        if item['role'] == 'assistant':
            assistant_output = item['content']
            break
    return assistant_output

#example usage

# pipe = init_pipeline()
#
# songs_list = get_songs()
#
# song = pick_song(songs_list)
#
# lyrics = pick_lyrics(song)
#
# print(lyrics)


