import { useEffect, useState } from "react";
import "./Chat.css";
import { SubmitButton } from "../utils/assets";

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
          format: "plain-text",
          length: "medium",
        };

        setIsLoading(true);
        setIsError(false);

        const apiCheck = await self.ai.summarizer.capabilities();
        if (!apiCheck || apiCheck.available === "no") {
          setIsError(true);
          return;
        }

        const summarizer = await self.ai.summarizer.create(options);
        if (!summarizer) {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: "Failed to create summary" },
          ]);
          setIsError(true);
          return;
        }
        await summarizer.ready;

        if (apiCheck.available === "readily") {
          const summary = await summarizer.summarize(options);
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
    if (
      messages.length > 1 &&
      messages[messages.length - 1].sender === "user"
    ) {
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
    <div className="main flex flex-col flex-grow">
      {/* Header */}
      <div className="header sticky top-0 bg-white flex justify-center items-center md:items-start flex-col h-[60px] md:h-[80px] px-[16px] md:px-[32px]  py-[10px] md:py-[20px] gap-[10px] border-[1px] border-[#CBD5E1]">
        <h1 className="title flex-1 font-bold text-[25px] md:text-[30px]">
          Summarizer
        </h1>
      </div>

      {/* Chat Section */}
      <div className="chat flex flex-col items-center  px-[20px] md:px-[80px] md:py-[32px] gap-[12px] md:gap-[24px] max-w-screen-lg ">
        <div className="userinput flex flex-col justify-end gap-2 w-full mb-[80px] md:mb-[100px]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col items-end max-w-[80%] ${msg.sender}`}
            >
              <p
                className={`${
                  msg.sender === "user"
                    ? "bg-[#4F46E5] text-white"
                    : "bg-[#F8FAFC]"
                } rounded-[24px] p-[12px] gap-[10px] break-words`}
              >
                {msg.text}
              </p>
            </div>
          ))}
        </div>

        <div className="inputfield bg-white fixed bottom-0 md:w-8/12 max-w-screen-lg mx-auto md:px-[80px] md:py-[16px]">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 bg-gray-100 rounded-full px-4 py-3 w-full"
          >
            <input
              type="text"
              value={tempInput}
              onChange={(e) => setTempInput(e.target.value)}
              placeholder="Summarize text..."
              className="flex-grow bg-transparent border-none outline-none text-gray-800 p-2"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#1E293B] text-white rounded-full p-0 flex items-center justify-center transition duration-300"
            >
              {isLoading ? (
                <span className="animate-spin w-[24px] h-[24px] border-2 border-white bg-white border-t-[#4F46E5] rounded-full"></span>
              ) : (
                <img
                  src={SubmitButton}
                  className="w-[24px] h-[24px]"
                  alt="Send"
                />
              )}
            </button>
          </form>
        </div>

        {isError && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! Summarizer API unavailable </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summarizer;
