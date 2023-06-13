// Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <div className="bottom-0 my-auto w-full bg-black p-6 text-white">
      <p className="text-center">
        Questions, suggestions, etc. just DM on Twitter
        <span className="ml-1">
          <a
            href="https://twitter.com/vdutts7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-300"
          >
            @vdutts7
          </a>
        </span>{" "}
        or an email at
        <a
          href="mailto:me@vdutts7.com"
          className="ml-1 text-red-500 hover:text-red-300"
        >
          me@vdutts7.com
        </a>
      </p>
    </div>
  );
};

export default Footer;
