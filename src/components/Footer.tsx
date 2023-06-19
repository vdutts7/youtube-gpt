// Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <div className="bottom-0 my-auto w-full bg-black p-6 text-white">
      <p className="text-center">
        Data processing, backend, & UI made by 
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
        . Follow me for more and access the source code for this object-- links in header. 
      </p>
    </div>
  );
};
export default Footer;
