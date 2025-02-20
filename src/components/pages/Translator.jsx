import { useEffect, useState } from "react";
import "./Chat.css";
import { SubmitButton } from "../utils/assets";

const Translator = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Enter text to Translate." },
  ]);
  const [tempInput, setTempInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tempLanguage, setTempLanguage] = useState("");


  // language detection API call
  useEffect(() => {
    const initDetector = async (userInput) => {
      try {
        if (
          typeof self === "undefined" ||
          !self.ai ||
          !self.ai.languageDetector
        ) {
          setIsError(true);
          console.log("AI language detector is unavailable.");
          return;
        }

        if (!userInput) {
          console.log("No input provided for language detection.");
          return;
        }

        setIsLoading(true);
        setIsError(false);

        const apiCheck = await self.ai.languageDetector.capabilities();
        if (!apiCheck || apiCheck.available === "no") {
          setIsError(true);
          return;
        }

        const detector = await self.ai.languageDetector.create();
        if (!detector) {
          console.error("Failed to create language detector.");
          setIsError(true);
          return;
        }
        await detector.ready;

        if (apiCheck.available === "readily") {
          const languageDetection = await detector.detect(userInput);
          setTempLanguage(languageDetection[0].detectedLanguage);
        }
      } catch (error) {
        console.error("Error detecting language:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    initDetector(userInput);
  }, [userInput]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tempInput.trim()) return;
    setUserInput(tempInput);

    setMessages((prev) => [...prev, { sender: "user", text: tempInput }]);
    setTempInput(""); // Clear input field
  };

  return (
    <div className="chat flex flex-col items-center px-[80px] py-[32px] gap-[24px] max-w-screen-lg mx-auto">
      <div className="userinput flex flex-col justify-end gap-2 w-full mb-[100px]">
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

      <div className="inputfield bg-white fixed bottom-0 w-full max-w-screen-lg mx-auto px-[80px] py-[16px]">
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
        <p className="error-message">An error occurred. Try again.</p>
      )}
    </div>
  );
};

export default Translator;
