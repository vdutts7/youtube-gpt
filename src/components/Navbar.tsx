import React from "react";
import Image from "next/image";
import { IconExternalLink } from "@tabler/icons-react";
import { MarkGithubIcon } from '@primer/octicons-react';
import { FC } from "react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-black px-12 py-4">
      <div className="flex items-left">
        <a href="https://yt-chat-mkbhd.vercel.app">
          <img src="/yt-chat-logo_.png" alt="yt-chat-logo" className="h-12" />
        </a>

        <div className="text-white ml-4 font-bold text-lg flex items-center">
          MKBHD ⚡️ 
          <span className="mx-2"> | </span>
          <span className="mx-2">AI Chatbot</span>
        </div>
        
      </div>

      <div className="flex items-right text-white hover:text-red-600">

        <div className="flex items-center hover:text-red-500">
          <a href="https://github.com/vdutts7/yt-chat-mkbhd" target="_blank" rel="noreferrer">
            <MarkGithubIcon className="h-7 w-7 hover:text-red-600" />
          </a>
        </div>

    

      </div>

    </nav>
  );
}
export default Navbar;