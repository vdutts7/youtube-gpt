import React from "react";
import Image from "next/image";
import { IconExternalLink } from "@tabler/icons-react";
import { FC } from "react";


function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-black px-12 py-4">


      <div className="flex items-left">
        <a href="https://yt-chat-mkbhd.vercel.app">
          <img src="/yt-chat-logo_.png" alt="yt-chat-logo" className="h-12" />
        </a>
      </div>



      <div className="flex items-right text-white hover:text-red-500">

        <a className="flex items-center hover:text-red-500" href="https://www.youtube.com/@mkbhd" target="_blank" rel="noreferrer">
          
          
          <div className="hover:text-red-500 sm:flex"><i>YouTube channel: @MKBHD</i></div>
          
          <IconExternalLink
            className="ml-1 hover:text-red-500"
            size={20}
          />


        </a>
      </div>


    </nav>
  );
}
export default Navbar;
