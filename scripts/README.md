# YT CHAT

## 1️⃣ Download YT Videos

### Setup environment

- `conda env list`
- `conda activate youtube-chat`

### Scrape YT channel

- `python scripts/scrape_youtube_channel_videos.py ____ 100 scripts/scrapped_channels/youtuber-csvfile.csv`

### Download audio files

- `python scripts/youtube_download.py scripts/scrapped_channels/youtuber-csvfile.csv scripts/audio_files/`

## 2️⃣ Transcribe audio files

AssemblyAI will be used here:
- `python scripts/transcribe_youtube_videos.py`

## 3️⃣ Upsert to Pinecone

- `python scripts/pinecone_helper.py scripts/scrapped_channels/youtuber-csvfile.csv scripts/video_transcriptions/`
