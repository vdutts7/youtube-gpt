import argparse
import csv
import os
import yt_dlp
from urllib.parse import parse_qs, urlparse


def download_audio(url, output_path):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': output_path,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'SponsorBlock': False,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])


def extract_video_id(url):
    parsed_url = urlparse(url)
    video_id = parse_qs(parsed_url.query).get('v', [None])[0]
    return video_id


def main(csv_file, output_folder):
    with open(csv_file, 'r') as f:
        youtube_urls = f.read().splitlines()

    for url in youtube_urls:
        url = url.strip()
        if not url or not url.startswith("http"):
            print(f"Skipping invalid URL: '{url}'")
            continue
        video_id = extract_video_id(url)
        print("video_id", video_id)
        if video_id is None:
            print(f"Couldn't extract video ID from URL: '{url}'")
            continue
        output_path = os.path.join(output_folder, video_id)
        download_audio(url, output_path)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Download audio from YouTube URLs in a CSV file')
    parser.add_argument('csv_file', type=str,
                        help='Path to the CSV file containing YouTube URLs')
    parser.add_argument('output_folder', type=str,
                        help='Output folder path')
    args = parser.parse_args()

    main(args.csv_file, args.output_folder)
