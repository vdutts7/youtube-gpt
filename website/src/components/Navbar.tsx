import React from "react";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-black px-12 py-4">
      <div className="flex items-left">
        <a href="https://www.youtube.com/channel/@mkbhd">
          <Image src="/yt-chat-logo_.png" alt="yt-chat-logo" className="h-8" />
        </a>
        {/* <div className="text-2xl font-bold text-white ml-2">
          Chat With MKBHD 
        </div> */}
      </div>
    </nav>
  );
}

export default Navbar;
