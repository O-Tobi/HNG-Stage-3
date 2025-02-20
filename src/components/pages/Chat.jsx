import { useEffect, useState } from "react";
import "./Chat.css"; // Ensure to create and style this file

const Summarizer = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Enter text to summarize." },
  ]);
  const [tempInput, setTempInput] = useState(""); // Temporary input storage
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const initSummarizer = async (textInput) => {
      try {
        if (typeof self === "undefined" || !self.ai || !self.ai.summarizer) {
          setIsError(true);
          return;
        }

        const options = {
          sharedContext: textInput,
          type: "key-points",
          format: "markdown",
          length: "medium",
        };

        setIsLoading(true);
        setIsError(false);

        const apiCheck = await self.ai.summarizer.capabilities();
        if (!apiCheck || apiCheck.available === "no") {
          setIsError(true);
          return;
        }

        const summarizer = await self.ai.summarizer.create();
        if (!summarizer) {
          console.error("Failed to create summarizer.");
          setIsError(true);
          return;
        }

        if (apiCheck.available === "readily") {
          const summary = await summarizer.summarize(options.sharedContext);
          let result = "";

          if (summary && typeof summary[Symbol.asyncIterator] === "function") {
            let previousChunk = "";
            for await (const chunk of summary) {
              const newChunk = chunk.startsWith(previousChunk)
                ? chunk.slice(previousChunk.length)
                : chunk;
              result += newChunk;
              previousChunk = chunk;
            }
          } else {
            result = summary || "No summary generated.";
          }

          setMessages((prev) => [...prev, { sender: "bot", text: result }]);
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    // If the last message was from the user, generate a summary
    if (messages.length > 1 && messages[messages.length - 1].sender === "user") {
      const userMessage = messages[messages.length - 1].text;
      initSummarizer(userMessage);
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tempInput.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: tempInput }]);
    setTempInput(""); // Clear input field
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={tempInput}
            onChange={(e) => setTempInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Send"}
          </button>
        </form>
      </div>
      {isError && <p className="error-message">An error occurred. Try again.</p>}
    </div>
  );
};

export default Summarizer;
