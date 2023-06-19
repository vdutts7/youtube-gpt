/* eslint-disable */

import Image from "next/image";
import { IconExternalLink } from "@tabler/icons-react";

const MKBHD = () => (
  <div className="m-4 max-w-sm overflow-hidden rounded text-center glassy-no-glow text-white rounded-lg shadow-2xl hover:shadow-4xl">

    <Image
      width={150}
      height={150}
      className="mx-auto rounded-full"
      src="/mkbhd.png"
      alt="Marques Brownlee AI"
    />
    
    <div className="px-6 pt-4">
      <div className="mb-2 text-2xl text-center font-bold">⚡️ Marques Brownlee ⚡️
        <span className="mx-2">  </span>
      </div>
      <div className="text-base text-xs text-gray-400 text-center">YouTuber  •  AI Bot 🤖</div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0rem' }}>
        
        <a href="https://www.youtube.com/@mkbhd">
          <Image
            width={24}
            height={24}
            className="mx-auto rounded-full"
            src="/yt.png"
            alt="Marques Brownlee AI"
          />
        </a>
        <a href="https://www.youtube.com/@mkbhd">
          <IconExternalLink
              className="ml-1 text-gray-400 hover:text-red-600"
              size={14}
            />
        </a>

      </div>
      <div className="text-base text-center text-xs text-gray-400 pt-2 mx-0">
        What&rsquo;s up everyone, I made an AI doppelgänger chatbot to geek out about tech when I&rsquo;m not around! This little guy hardcore studying all my videos and abosrbing some serious MKBHD wisdom!
      </div>
    </div>
  </div>
);

export default MKBHD;