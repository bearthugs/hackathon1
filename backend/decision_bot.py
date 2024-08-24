import torch
from scrapper import get_list_tracks
from transformers import pipeline
from huggingface_hub import login

login("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")

tracks = get_list_tracks()
messages = [
    {"role": "user", "content": f"Can you pick a random song from these choices, giving just the song name, song artist, and language: {tracks}"},
]

pipe = pipeline(
    "text-generation",
    model="google/gemma-2-2b-it",
    max_length=700,
)
output = pipe(messages)
assistant_output = ""
for item in output[0]['generated_text']:
    if item['role'] == 'assistant':
        assistant_output = item['content']
        break
print(assistant_output)