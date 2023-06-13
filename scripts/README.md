# YT CHAT

## 1️⃣ Download YT Videos

### Setup environment

- `conda env list`
- `conda activate youtube-chat`

### Scrape YT channel

- `python scripts/scrape_youtube_channel_videos.py https://www.youtube.com/@mkbhd 100 scripts/scrapped_channels/mkbhd.csv`



### Download audio files

- `python scripts/youtube_download.py scripts/scrapped_channels/mkbhd.csv scripts/audio_files/`

## 2️⃣ Transcribe audio files

AssemblyAI will be used here:
- `python scripts/transcribe_youtube_videos.py scripts/audio_files/ scripts/transcripts`

## 3️⃣ Upsert to Pinecone

- `python scripts/pinecone_helper.py scripts/scrapped_channels/mkbhd.csv scripts/transcripts/`

