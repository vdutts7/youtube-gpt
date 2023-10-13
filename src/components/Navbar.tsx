/* eslint-disable */

import React from "react"; 
import { MarkGithubIcon } from '@primer/octicons-react';  
import { IconBrandTwitter } from "@tabler/icons-react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-black px-12 py-4">
      <div className="flex items-left">
        <a href="https://mkbhd-ai.vercel.app">    
          <img src="/yt-chat-logo_.png" alt="yt-chat-logo" className="h-12" />
        </a>

        <div className="text-white mt-2 ml-4 font-bold text-lg flex items-center">
          <span className="title-text">MKBHD ⚡️</span>  
          <span className="mx-2"> | </span>
          <span className="mx-2">AI Chatbot</span>
        </div>
      </div>

      <div className="flex items-right text-white ">

        <div className="flex items-center">     
         <a href="https://github.com/vdutts7/youtube-gpt" target="_blank" rel="noreferrer">
           <MarkGithubIcon className="h-7 w-7 hover:text-red-600" />   
         </a>
         <a href="https://twitter.com/vdutts7" target="_blank" rel="noreferrer">
            <IconBrandTwitter className="h-7 w-7 mx-2 hover:text-red-600"/>
         </a>
        </div>          

      </div>

    </nav>
 );
}
export default Navbar;