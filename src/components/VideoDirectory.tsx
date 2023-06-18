import React from "react";

function VideoDirectory({ messages }) {
  // Extract the video links from the messages
  const videoLinks = messages
    .filter((message) => message.sources && message.sources.length > 0)
    .map((message) => message.sources[0].url);

  return (
    <div>
      <h2>Video Directory</h2>
      <ul>
        {videoLinks.map((link, index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoDirectory;