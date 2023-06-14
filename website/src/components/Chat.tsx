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
    <div className="m-2 flex h-4/5 w-full flex-col overflow-y-auto">
      <div className="flex-grow space-y-4 overflow-y-auto border-2 border-solid p-4">
        {messages.length === 0 && (
          <div className="mt-4 flex flex-col items-center justify-center space-y-2 text-gray-500">
            <BiMessageRounded size={48} />
            <p>Hey, so I got something about the Vision Pro that you NEED to know... 👓  </p>
          </div>
        )}
        {messages.map((message) => {
          // This will store the URLs we have seen for this message
          const seenUrls = new Set<string>();

          return (
            <div
              key={message.id}
              className={`flex flex-col items-end ${
                message.sender === "User" ? "justify-end" : ""
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.sender === "User"
                    ? "bg-black text-white"
                    : "bg-red text-white"
                }`}
              >
                {message.content}
                {/* Display sources if present */}
                {message.sources &&
                  message.sources.length > 0 &&
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
                        className="mt-2 transform cursor-pointer rounded bg-gray-100 p-2 text-sm shadow-md transition-all duration-300 ease-in-out hover:scale-105"
                        onClick={() => window.open(source.url, "_blank")}
                      >
                        <p className="font-bold text-gray-700">
                          {source.title}
                        </p>
                      </div>
                    ))}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="my-4 flex">
        <input
          type="text"
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Type your msessage"
        />
        <button
          type="submit"
          className="ml-4 rounded-md bg-red-500 px-4 py-2 text-white disabled:bg-red-200"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default Chat;
