import argparse
import requests
import json
import time
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get the API token from the environment variables
ASSEMBLY_AI_API_TOKEN = os.getenv("ASSEMBLY_AI_API_TOKEN")

# If the API token is not set, raise an error
if ASSEMBLY_AI_API_TOKEN is None:
    raise RuntimeError(
        "Please set the ASSEMBLY_AI_API_TOKEN environment variable")


def read_file(filename, chunk_size=5242880):
    # Open the file in binary mode for reading
    with open(filename, 'rb') as _file:
        while True:
            # Read a chunk of data from the file
            data = _file.read(chunk_size)
            # If there's no more data, stop reading
            if not data:
                break
            # Yield the data as a generator
            yield data


def upload_file(api_token, path):
    print(f"Uploading file: {path}")
    headers = {'authorization': api_token}
    response = requests.post('https://api.assemblyai.com/v2/upload',
                             headers=headers,
                             data=read_file(path))
    if response.status_code == 200:
        return response.json()["upload_url"]
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None


def create_transcript(api_token, audio_url):
    print("Transcribing audio... This might take a moment.")
    url = "https://api.assemblyai.com/v2/transcript"
    headers = {
        "authorization": api_token,
        "content-type": "application/json"
    }
    data = {
        "audio_url": audio_url
    }
    response = requests.post(url, json=data, headers=headers)
    transcript_id = response.json()['id']
    polling_endpoint = f"https://api.assemblyai.com/v2/transcript/{transcript_id}"
    while True:
        transcription_result = requests.get(
            polling_endpoint, headers=headers).json()
        if transcription_result['status'] == 'completed':
            break
        elif transcription_result['status'] == 'error':
            raise RuntimeError(
                f"Transcription failed: {transcription_result['error']}")
        else:
            time.sleep(3)
    return transcription_result


def main(audio_directory, output_directory):
    audio_files = [os.path.join(audio_directory, filename) for filename in os.listdir(
        audio_directory) if filename.endswith('.mp3')]

    for filename in audio_files:
        # Remove the file extension
        base_filename = os.path.basename(filename)
        video_id = base_filename.split('.')[0]

        upload_url = upload_file(ASSEMBLY_AI_API_TOKEN, filename)
        transcript = create_transcript(ASSEMBLY_AI_API_TOKEN, upload_url)

        # Save the transcript to a JSON file
        output_file = os.path.join(output_directory, video_id + '.json')
        os.makedirs(os.path.dirname(output_file), exist_ok=True)

        with open(output_file, 'w') as outfile:
            json.dump(transcript, outfile)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Transcribe audio files with AssemblyAI')
    parser.add_argument('audio_directory', type=str,
                        help='Folder containing audio files')
    parser.add_argument('output_directory', type=str,
                        help='Transcription output folder path')
    args = parser.parse_args()

    main(args.audio_directory, args.output_directory)
