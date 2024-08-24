import torch
from scrapper import get_user_info
from transformers import pipeline
from huggingface_hub import login

login("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")

name, tracks = get_user_info()
messages = [
    {"role": "user", "content": f"Can you pick a random song from these choices, giving just the song name, song artist, and language: {tracks}"},
]

mps_device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

pipe = pipeline(
    "text-generation",
    model="google/gemma-2-2b-it",
    max_length=700,
    device=mps_device,
)

if torch.backends.mps.is_available():
    print("Loading model into MPS device...")
    pipe.model = pipe.model.to(mps_device)

output = pipe(messages)
assistant_output = ""
for item in output[0]['generated_text']:
    if item['role'] == 'assistant':
        assistant_output = item['content']
        break
print(assistant_output)