import argparse
import csv
import yt_dlp


def get_latest_videos(channel_url, num_videos):
    if channel_url.startswith('https://www.youtube.com/@'):
        channel_username = channel_url.split('https://www.youtube.com/@')[1]
        channel_info_url = f'https://www.youtube.com/c/@mkbhd/videos'
    else:
        channel_info_url = channel_url + '/videos'

    ydl_opts = {
        'dump_single_json': True,
        'extract_flat': True,
        'quiet': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(channel_info_url, download=False)
        entries = info_dict.get('entries', [])
    latest_videos = entries[:num_videos]
    video_data = []
    for video in latest_videos:
        video_data.append({
            'url': 'https://www.youtube.com/watch?v=' + video['id'],
            'title': video.get('title', ''),
        })
    return video_data


def write_to_csv(video_data, output_file):
    fieldnames = ['url', 'title']
    with open(output_file, 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for video in video_data:
            writer.writerow(video)


def main(channel_url, num_videos, output_file):
    video_data = get_latest_videos(channel_url, num_videos)
    write_to_csv(video_data, output_file)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Fetch latest YouTube videos from a channel.')
    parser.add_argument('channel_url', type=str,
                        help='URL of the YouTube channel')
    parser.add_argument('num_videos', type=int,
                        help='Number of videos to fetch')
    parser.add_argument('output_file', type=str, help='Output file path')
    args = parser.parse_args()

    main(args.channel_url, args.num_videos, args.output_file)
