<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://github.com/vdutts7/yt-chat-mkbhd/blob/main/public/yt-chat-logo_.png" alt="Logo" width="80" height="80">
    <img src="https://github.com/vdutts7/yt-chat-mkbhd/blob/main/public/mkbhd.png" alt="Logo" width="75" height="75">
    <img src="https://github.com/vdutts7/yt-chat-mkbhd/blob/main/public/openai.png" alt="Logo" width="67" height="67">

  
  </a>
  <h3 align="center">YouTube MKBHD AI Chatbot</h3> <p align="center"> YouTube MKBHD AI Chatbot ~ trained on 100+ videos from tech-gadget YouTuber Marques Brownlee <a href="https://www.youtube.com/@mkbhd"> @MKBHD </a> </p> </div> <p align="center"> <img src="https://github.com/vdutts7/yt-chat-mkbhd/blob/main/public/p.gif"/> </p> 

<!-- TABLE OF CONTENTS -->
## Table of Contents
  <ol>
    <a href="#about">📝 About</a>
        <ul>
        </ul>
    <a href="#how-to-build">💻 How to build</a>
        <ul>
            <li><a href="#initial-setup">Initial setup</a></li>
            <li><a href=#handle-massive-data>Handle massive data</a></li>
            <li><a href=#embeddings-and-database-backend>Embeddings and database backend</a></li>
            <li><a href=#Frontend-UI-with-chat>Frontend UI with chat</a></li>
            <li><a href=#run-app>Run app</a></li>
        </ul>
    <a href="#next-steps">🚀 Next steps</a>
        <ul>
            <li><a href=#deploy>Deploy</a></li>
            <li><a href=#customizations>Customizations</a></li>
        </ul>
    <a href="#tools-used">🔧 Tools used</a>
        <ul>
        </ul>
    <a href="#contact">👤 Contact</a>
  </ol>



<!-- ABOUT -->
## 📝 About

Chat with 100+ YouTube videos from any creator in less than 10 minutes. This project combines basic Python scripting, vector embeddings, OpenAI, Pinecone, and Langchain into a modern chat interface, allowing you to quickly reference any content your favorite YouTuber covers. Type in natural language and get returned detailed answers: (1) in the style / tone of your YouTuber, and (2) with the top 2-3 specific videos referenced hyperlinked.


_Example used in this repo is tech content creator Marques Brownlee, also known as MKBHD_ 

<p align="right">(<a href="#readme-top">back to top</a>)</p> 

## 💻 How to build 

_Note: macOS version, adjust accordingly for Windows / Linux_

### Initial setup

Clone the repo and install dependencies.

```
git clone https://github.com/vdutts7/yt-ai-chat
cd yt-ai-chat
npm i
```

Create a .env file in root directory and add your API keys (refer `.env.example` for this template):

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


Navigate to `scripts` folder. 

`cd scripts`

This folder will host all of the data from the YouTube videos. 

**1️⃣ Download YT videos ⬇️**

Setup python environemnt:
- `conda env list`
- `conda activate youtube-chat`
- `pip install -r requirements.txt`

Scrape YT channel. Replace `@mkbhd` with username of the channel of your choice and replace `100` with how ever no. of videos you want inlcuded (ccript traverses backwards starting from most recent upload). A new file `mkbhd.csv` will be created at the directory referenced below:
- `python scripts/scrape_vids.py https://www.youtube.com/@mkbhd 100 scripts/vid_list/mkbhd.csv`

Refer to the  `example_mkbhd.csv` inside the folder and verify your output matches the format. 

<img width="614" alt="image" src="https://github.com/vdutts7/yt-ai-chat/assets/63992417/7bf1c02c-7201-48b4-9607-e6de72fcafa2">


Download audio files.

- `python scripts/download_yt_audios.py scripts/vid_list/mkbhd.csv scripts/audio_files/`

<img width="158" alt="image" src="https://github.com/vdutts7/yt-ai-chat/assets/63992417/8c16f79a-2957-4d45-b81e-c450cf7e77f1">


<img width="164" alt="image" src="https://github.com/vdutts7/yt-ai-chat/assets/63992417/f1105604-145b-4019-8026-f1c262497cde">

2️⃣ Transcribe audio files ✍️

We will utilize AssemblyAI's API wrapper class for OpenAI's Whisper API. Their script provides step-by-step directions for a more efficient, faster speech-to-text conversion as Whisper is way too slow and will cost you more. I spent ~ $3.50 to transcribe the 100 videos for MKBHD.

`python scripts/transcribe_audios.py scripts/audio_files/ scripts/transcripts`

![Uploading image.png…]()


3️⃣ Upsert to Pinecone database ⬆️☁️**

- `python scripts/pinecone_helper.py scripts/vid_list/mkbhd.csv scripts/transcripts/`

Pinecone index setup I used below. I used P1 since this is optimized for speed. 1536 is OpenAI's standard we're limited to when querying data from the vectorstore: 
<img width="951" alt="image" src="https://github.com/vdutts7/yt-ai-chat/assets/63992417/01deb2f1-f563-4e9d-97bf-d32ccda61d62">



### Embeddings and database backend

Breaking down `scripts/pinecone_helper.py` :
- Chunk size of 1000 characters with 500 character overlap. I found this working for me but obviously experiment and adjust according to your content library's size, complexity, etc.
- Metadata: (1) video url and (2) video title

With vectorstore loaded, we use Langchain's Conversational Retrieval QA to ask questions, extract relevant metadata from Pinecone, and deliver it back to the user in a packaged answer format

### Frontend UI with chat

The `scrape-embed.ts` script:

- Retrieves URLs from `/config/class-website-urls.ts`, extract the HTML/CSS data via `cheerio` as specified in `/utils/custom_web_loader.ts` 
- Vectorizes and embeds data into a JSON object using OpenAI's Embeddings(text-embedding-ada-002). This makes several vectors of 1536 dimensionality optimized for cosine similarity searches.
- Upserts embeddings into `documents` (Supabase vectorstore). The upsert operation inserts new rows and overwrites existing rows.

![visualized-flow-chart](https://github.com/vdutts7/cs186-ai-chat/assets/63992417/abb4be4c-06da-4be2-b29e-b10134e17c24)


### Run app

```
npm run dev
```

Go to `http://localhost:3000`. You should be able to type and ask questions now. Done ✅ 

<img src="https://github.com/vdutts7/yt-ai-chat/assets/63992417/0a795dca-41e4-4d34-80b9-ebe19268571c" alt="Logo" width="390" height="390">

## 🚀 Next steps

### Deploy

I used [Vercel](https://vercel.com/dashboard) as this was a small project.

_Alternatives: Heroku, Firebase, AWS Elastic Beanstalk, DigitalOcean, etc._

### Customizations

**UI/UX:** change to your liking. 

**Bot behavior:** edit prompt template in `/utils/makechain.ts` to fine-tune and add greater control on the bot's outputs.

**Data:** change URLs to handle whatever pages you want

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- BUILT WITH -->
## 🔧 Built With
[![Next][Next]][Next-url]
[![Typescript][Typescript]][Typescript-url]
[![Langchain][Langchain]][Langchain-url]
[![OpenAI][OpenAI]][OpenAI-url]
[![cheerio][cheerio]][cheerio-url]
[![Supabase][Supabase]][Supabase-url]
[![Tailwind CSS][TailwindCSS]][TailwindCSS-url]
[![Vercel][Vercel]][Vercel-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## 👤 Contact

`me@vdutts7.com` 

🔗 Project Link: `https://github.com/vdutts7/cs186-ai-chat`

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


[Next]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

[Langchain]: https://img.shields.io/badge/🦜🔗Langchain-DD0031?style=for-the-badge&color=<brightgreen>
[Langchain-url]: https://langchain.com/

[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=skyblue&color=0A192F
[TailwindCSS-url]: https://tailwindcss.com/

[OpenAI]: https://img.shields.io/badge/OpenAI%20ada--002%20GPT--3-0058A0?style=for-the-badge&logo=openai&logoColor=white&color=4aa481
[OpenAI-url]: https://openai.com/

[cheerio]: https://img.shields.io/badge/cheerio-DD0031?style=for-the-badge&logo=https://github.com/vdutts7/cs186-ai-chat/public/cheerio-logo.png&logoColor=white&color=db903c
[cheerio-url]: https://cheerio.js.org/

[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/

[Supabase]: https://img.shields.io/badge/Supabase%20pgvector-FFCA28?style=for-the-badge&logo=Supabase&logoColor=49E879&color=black
[Supabase-url]: https://Supabase.com/

[Vercel]: https://img.shields.io/badge/Vercel-FFFFFF?style=for-the-badge&logo=Vercel&logoColor=white&color=black
[Vercel-url]: https://Vercel.com/
