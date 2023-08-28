<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://github.com/vdutts7/yt-chat-mkbhd/blob/main/public/yt-chat-logo_.png" alt="Logo" width="80" height="80">
    <img src="https://github.com/vdutts7/yt-chat-mkbhd/blob/main/public/mkbhd.png" alt="Logo" width="75" height="75">
    <img src="https://github.com/vdutts7/yt-chat-mkbhd/blob/main/public/openai.png" alt="Logo" width="67" height="67">

  
  </a>
  

  <h2 align="center">YouTubeGPT ft. Marques Brownlee (@MKBHD) </h2> <p align="center"> AI Chatbot with 100+ videos from tech/gadget YouTuber Marques Brownlee 
<a href="https://www.youtube.com/@mkbhd"> @MKBHD </a> </p> </div> <p align="center"> <img src="https://github.com/vdutts7/yt-chat-mkbhd/blob/main/public/p.gif"/> </p> 

<!-- TABLE OF CONTENTS -->
## Table of Contents
<ol>
    <a href="#about">📝 About</a>
        <ul>
        </ul>
    <a href="#how-to-build">💻 How to build</a><br/>
    <a href="#next-steps">🚀 Next steps</a> 
       <ul>
        </ul>
    <a href="#tools-used">🔧 Tools used</a>
        <ul>
        </ul>
    <a href="#contact">👤 Contact</a>
  </ol>



<br ></br>

<!-- ABOUT -->
## 📝 About

Chat with 100+ YouTube videos from any creator in less than 10 minutes. This project combines basic Python scripting, vector embeddings, OpenAI, Pinecone, and Langchain into a modern chat interface, allowing you to quickly reference any content your favorite YouTuber covers. Type in natural language and get returned detailed answers: (1) in the style / tone of your YouTuber, and (2) with the top 2-3 specific videos referenced hyperlinked.

_Example used in this repo is tech content creator Marques Brownlee, also known as MKBHD_ 

<p align="right">(<a href="#readme-top">back to top</a>)</p> 


## 💻 How to build 
_Note: macOS version, adjust accordingly for Windows / Linux_

### Initial setup

Clone and install dependencies:

```
git clone https://github.com/vdutts7/yt-ai-chat
cd yt-ai-chat
npm i
```

Copy `.env.example` and rename to `.env` in root directory. Fill out API keys:

```
ASSEMBLY_AI_API_TOKEN=""
OPENAI_API_KEY=""
PINECONE_API_KEY=""
PINECONE_ENVIRONMENT=""
PINECONE_INDEX=""
```

Get API keys:
- [AssemblyAI](https://www.assemblyai.com/docs) - ~ $3.50 per 100 vids
- [OpenAI](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key)
- [Pinecone](https://docs.pinecone.io/docs/quickstart)
      
_**IMPORTANT: Verify that `.gitignore` contains `.env` in it.**_


### Handle massive data

Outline: 
- Export metadata (.csv) of YouTube videos ⬇️
- Download the audio files
- Transcribe audio files

Navigate to `scripts` folder, which will host all of the data from the YouTube videos. 
   
   ```
   cd scripts
   ```

Setup python environemnt:

```
conda env list
conda activate youtube-chat
pip install -r requirements.txt
```
  
Scrape YouTube channel-- replace `@mkbhd` with channel of your choice. Replace `100` with the number of videos you want included (the script traverses backwards starting from most recent upload). A new file `mkbhd.csv` will be created at the directory as referenced below:

```
python scripts/scrape_vids.py https://www.youtube.com/@mkbhd 100 scripts/vid_list/mkbhd.csv
```

Refer to `example_mkbhd.csv` inside folder and verify your output matches this format:

<img width="400" alt="image" src="https://github.com/vdutts7/yt-ai-chat/assets/63992417/7bf1c02c-7201-48b4-9607-e6de72fcafa2">
    
Download audio files:

```
python scripts/download_yt_audios.py scripts/vid_list/mkbhd.csv scripts/audio_files/
```

<img width="130" alt="image" src="https://github.com/vdutts7/yt-ai-chat/assets/63992417/8c16f79a-2957-4d45-b81e-c450cf7e77f1">

We will utilize AssemblyAI's API wrapper class for OpenAI's Whisper API. Their script provides step-by-step directions for a more efficient, faster speech-to-text conversion as Whisper is way too slow and will cost you more. I spent ~ $3.50 to transcribe the 100 videos for MKBHD. 

<img width="348" alt="image" src="https://github.com/vdutts7/yt-ai-chat/assets/63992417/e40716c7-1ab6-460a-bd39-b7658c052958">

```
python scripts/transcribe_audios.py scripts/audio_files/ scripts/transcripts
```

<img width="164" alt="image" src="https://github.com/vdutts7/yt-ai-chat/assets/63992417/f1105604-145b-4019-8026-f1c262497cde">

Upsert to Pinecone database:

```
python scripts/pinecone_helper.py scripts/vid_list/mkbhd.csv scripts/transcripts/
```

Pinecone index setup I used below. I used P1 since this is optimized for speed. 1536 is OpenAI's standard we're limited to when querying data from the vectorstore: 
<img width="951" alt="image" src="https://github.com/vdutts7/yt-ai-chat/assets/63992417/01deb2f1-f563-4e9d-97bf-d32ccda61d62">

### Embeddings and database backend

Breaking down `scripts/pinecone_helper.py` :
- Chunk size of 1000 characters with 500 character overlap. I found this working for me but obviously experiment and adjust according to your content library's size, complexity, etc.
- Metadata: (1) video url and (2) video title

With Pinecone vectorstore loaded, we use Langchain's Conversational Retrieval QA to ask questions, extract relevant metadata from our embeddings, and deliver back to the user in a packaged format as an answer. 

The relevant video titles are cited via hyperlinks directly to the video url.

### Frontend UI with chat

NextJs styled with Tailwind CSS. `src/pages/index.tsx` contains base skeleton. `src/pages/api/chat-chain.ts` is heart of the code where the Langchain connections are outlined. You should be able to type and ask questions now. Done ✅ 

<img src="https://github.com/vdutts7/yt-ai-chat/assets/63992417/0a795dca-41e4-4d34-80b9-ebe19268571c" alt="Logo" width="390" height="390">
<img width="500" alt="Screenshot 2023-06-20 at 4 17 08 PM" src="https://github.com/vdutts7/yt-ai-chat/assets/63992417/ae39f653-1ea2-4b96-8ea3-1a09cd008cbd">


## 🚀Next Steps

- Add sidebar of video links to reference
- User auth + DB backend to store chat history / log queries
- Improve bot personality: edit prompt template in `/src/pages/api/chat-chain.ts` to fine-tune output to sound more realistic.

<br/>


## 🔧Tools Used

[![Python][python]][python-url]
[![Langchain][langchain]][langchain-url]
[![OpenAI][openai]][openai-url]
[![AssemblyAI][assemblyai]][assemblyai-url]
[![Pinecone][pinecone]][pinecone-url]
[![Next][next]][next-url]
[![Typescript][typescript]][typescript-url]
[![Tailwind CSS][tailwindcss]][tailwindcss-url]
[![Vercel][vercel]][vercel-url]


<!-- CONTACT -->
## 👤Contact

[![Email][email]][email-url]
[![Twitter][twitter]][twitter-url]


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Python]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[Python-url]: https://www.python.org/

[Langchain]: https://img.shields.io/badge/🦜🔗Langchain-DD0031?style=for-the-badge&color=<brightgreen>
[Langchain-url]: https://langchain.com/

[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=skyblue&color=0A192F
[TailwindCSS-url]: https://tailwindcss.com/

[OpenAI]: https://img.shields.io/badge/OpenAI_GPT--3.5_+_Whisper-0058A0?style=for-the-badge&logo=openai&logoColor=white&color=4aa481
[OpenAI-url]: https://openai.com/

[AssemblyAI]: https://img.shields.io/badge/Assembly_AI-DD0031?style=for-the-badge&logo=https://github.com/vdutts7/yt-ai-chat/public/assemblyai.png&color=blue
[AssemblyAI-url]: https://www.assemblyai.com/

[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/

[Pinecone]: https://img.shields.io/badge/Pinecone-FFCA28?style=for-the-badge&https://github.com/vdutts7/yt-ai-chat/public/pinecone.png&logoColor=black&color=white
[Pinecone-url]: https://www.pinecone.io/

[Next]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

[Vercel]: https://img.shields.io/badge/Vercel-FFFFFF?style=for-the-badge&logo=Vercel&logoColor=white&color=black
[Vercel-url]: https://Vercel.com/


[website]: https://img.shields.io/badge/🔗Website-7f18ff?style=for-the-badge
[website-url]: https://ai-mkbhd.vercel.app/
[github]: https://img.shields.io/badge/💻Github-000000?style=for-the-badge
[github-url]: https://github.com/vdutts7/youtube-gpt/
[email]: https://img.shields.io/badge/me@vd7.io-FFCA28?style=for-the-badge&logo=Gmail&logoColor=00bbff&color=black
[email-url]: #
[twitter]: https://img.shields.io/badge/Twitter-FFCA28?style=for-the-badge&logo=Twitter&logoColor=00bbff&color=black
[twitter-url]: https://twitter.com/vdutts7/
