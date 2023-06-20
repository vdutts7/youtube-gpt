// Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <div className="bottom-0 my-auto text-xs w-full bg-black p-6 text-white">
      <p className="text-center">
        Scripts, backend, UI made by 
        <span className="ml-1">
          <a
            href="https://twitter.com/vdutts7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:font-bold"
          >
            @vdutts7.
            </span>
          </a>
          Access the source code
          <a href="https://github.com/vdutts7/yt-ai-chat" target="_blank" rel="noopener noreferrer" className="text-red-600 
          hover:font-bold"> here.</a>
      </p>
    </div>
  );
};
export default Footer;
