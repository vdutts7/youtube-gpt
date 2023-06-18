// Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <div className="bottom-0 my-auto w-full bg-black p-6 text-white">
      <p className="text-center">
        Made by 
        <span className="ml-1">
          <a
            href="https://twitter.com/vdutts7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:font-bold"
          >
            @vdutts7
          </a>
        </span>{" "}
        based on YouTuber
        <a
          href="https://www.youtube.com/@mkbhd"
          className="ml-1 text-red-600 hover:font-bold"
        >
          MKBHD
        </a>
      </p>
    </div>
  );
};

export default Footer;
