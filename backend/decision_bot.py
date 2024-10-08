import torch
from scrapper import get_lyrics, format_lyrics
from transformers import pipeline, Pipeline
from huggingface_hub import login


def init_pipeline() -> Pipeline:

    login("loginhere")

    mps_device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

    pipe = pipeline(
        "text-generation",
        model="google/gemma-2-2b-it",
        max_length=5000,
        device=mps_device,
    )

    if torch.backends.mps.is_available():
        print("Loading model into MPS device...")
        pipe.model = pipe.model.to(mps_device)

    return pipe

def get_songs(pipe: Pipeline, track_list: list) -> str:
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

def pick_lyrics(pipe: Pipeline, song: tuple, difficulty) -> str:
    lyrics = get_lyrics(song[0], song[1])
    lyrics = format_lyrics(lyrics)
    if difficulty == 1:
        temp = 5
    elif difficulty == 2:
        temp = 3
    elif difficulty == 3:
        temp = 1
    messages = [
        {"role": "user", "content": f"Can you pick out {temp} random consecutive line(s) from the lyrics of the song without any extra symbols, and without any preamble: {lyrics}"},
    ]
    output = pipe(messages)
    assistant_output = ""
    for item in output[0]['generated_text']:
        if item['role'] == 'assistant':
            assistant_output = item['content']
            break
    return assistant_output

def pick_song(pipe: Pipeline, song_list: str) -> str:
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

# pipe = init_pipeline()

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

