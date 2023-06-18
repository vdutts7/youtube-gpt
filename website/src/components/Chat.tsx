/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { BiMessageRounded } from "react-icons/bi";

interface Message {
  id: number;
  sender: string;
  content: string;
  sources?: { title: string; url: string }[];
}

function Chat() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((oldMessages) => [
      ...oldMessages,
      { id: Date.now(), sender: "User", content: input },
    ]);
    setChatHistory((old) => [...old, input]);
    setInput("");
    // Handle AI response here
    setLoading(true);
    axios
      .post("/api/langchain", {
        question: input,
        chat_history: chatHistory,
      })
      .then((resp) => {
        const answer = resp.data.answer;
        const sources = resp.data.sources;
        setChatHistory((old) => [...old, answer]);
        setMessages((oldMessages) => [
          ...oldMessages,
          { id: Date.now(), sender: "System", content: answer, sources },
        ]);
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again", {
          position: "bottom-right",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="m-2 flex h-4/5 flex-col overflow-y-auto glassy-no-glow bg-black px-2 rounded-lg sm:p-4 sm:border border-neutral-300 shadow-2xl">
      <div className="w-full bg-black flex-grow space-y-4 overflow-y-auto p-4">

        {messages.map((message) => {
          // This will store the URLs we have seen for this message
          const seenUrls = new Set<string>();

          return (
            <div
              key={message.id}
              className={`flex flex-col-end ${
                message.sender === "User" ? "justify-end" : "justify-start"
            }`} >
           
            <div
              className={`rounded-lg px-4 py-2${
                          message.sender === "User" ? " bg-white text-black" : " bg-red-600 text-white"
              }`}
              style={{

                borderRadius: "10px",
              // Conditionally add border styles based on the sender of the message
              ...(message.sender === "User"
                ? { border: "0px solid #ffffff" }
                : { border: "0px solid #ff00aa" }),
                    }}
                >
                {message.content}
                {/* Display sources if present */}
                {message.sources &&
                  message.sources.length > 0 
                  &&
                  message.sources
                    .filter((source) => {
                      // Check if we've seen this URL before
                      if (seenUrls.has(source.url)) {
                        // If we have, filter it out
                        return false;
                      } else {
                        // If we haven't, add it to the set and keep it in the array
                        seenUrls.add(source.url);
                        return true;
                      }
                    })
                    .map((source, index) => (
                      <div
                        key={index}
                        className="mt-2 transform cursor-pointer rounded glassy-no-glow p-2 text-sm shadow-md transition-all duration-300 ease-in-out hover:scale-105 bg-blue-400"
                        onClick={() => window.open(source.url, "_blank")}
                      >
                        <div className="flex items-right">
                          <img
                            src="https://www.youtube.com/yts/img/favicon_48-vflVjB_Qk.png"
                            alt="YouTube"
                            className="mr-2 w-4 h-4"
                          />
                          <p className="text-xs text-white"><i>{source.title}</i></p>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div>
        <form onSubmit={handleSubmit} className="w-full my-4 flex relative">
          <input
            type="text"
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            className="text-white bg-zinc-800 flex-grow rounded-md border border-gray-300 px-3 py-2 glassy focus:outline-none focus:border-white focus:shadow-outline box-shadow:2px 2px 5px 5px rgba(106, 106, 106, 0.8)" value={input} />

          <button className="absolute top-2 right-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                className="flex-shrink-0 ml-2 hover:cursor-pointer rounded-full p-1 
                          bg-red-600 focus:border-white box-shadow:2px 2px 5px 5px rgba(106, 106, 106, 0.8) focus:shadow-outline text-white hover:opacity-80">
                <path d="M12 5l0 14"></path><path d="M18 11l-6 -6"></path><path d="M6 11l6 -6"></path>
            </svg>
          </button>
        </form>
        
      </div>

    </div>
  );
}

export default Chat;
