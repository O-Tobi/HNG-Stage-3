import { useEffect, useState } from "react";
import "./Chat.css";
import { SubmitButton } from "../utils/assets";
import { languages } from "../utils/constants";

const Translator = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Enter text to Translate." },
  ]);
  const [tempInput, setTempInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tempLanguage, setTempLanguage] = useState("");
  const [finalLanguage, setFinalLanguage] = useState(languages[0].code);

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
          setMessages((prev) => [...prev, { sender: "bot", text: "Translator AAPI not available"}]);
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

  //   translator api call here

  useEffect(() => {
    const initTranslator = async () => {
      try {
        if (!self?.ai?.translator) {
          setIsError(true);
          return;
        }

        setIsLoading(true);
        setIsError(false);

        const apiCheck = await self.ai.translator.capabilities();
        if (!apiCheck || apiCheck.available === "no") {
          setIsError(true);
          return;
        }

        const translator = await self.ai.translator.create({
          sourceLanguage: tempLanguage,
          targetLanguage: finalLanguage,
        });

        if (!translator) {
          console.error("Failed to create translator.");
          setIsError(true);
          return;
        }

        if (apiCheck.available === "readily") {
          const translated = await translator.translate(userInput);
          setMessages((prev) => [...prev, { sender: "bot", text: translated }]);
        }
      } catch (error) {
        console.error("Error fetching translation:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (userInput) {
      initTranslator();
    }
  }, [userInput, tempLanguage, finalLanguage]); // Added dependencies

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tempInput.trim()) return;
    setUserInput(tempInput);

    setMessages((prev) => [...prev, { sender: "user", text: tempInput }]);
    setTempInput(""); // Clear input field
  };

  const handleSelectedLanguage = (event) => {
    setFinalLanguage(event.target.value);
    console.log("Selected Language:", event.target.value);
  };

  return (
    <div className="main flex flex-col flex-grow">
          {/* Header */}
          <div className="header sticky top-0 bg-white flex justify-center items-center md:items-start flex-col h-[60px] md:h-[80px] px-[16px] md:px-[32px] py-[10px] md:py-[20px] gap-[10px] border-[1px] border-[#CBD5E1]">
              <h1 className="title flex-1 font-bold text-[25px] md:text-[30px]">Translator</h1>
          </div>
  
          {/* Chat Section */}
          <div className="chat flex flex-col items-center px-[80px] py-[32px] gap-[24px] max-w-screen-lg ">
      <div className="userinput flex flex-col justify-end gap-2 w-full mb-[100px]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col items-end  max-w-[80%] ${msg.sender}`}
          >
            <p
              className={`${
                msg.sender === "user"
                  ? "bg-[#4F46E5] text-white"
                  : "bg-[#F8FAFC]"
              } rounded-[24px] p-[12px] gap-[10px] min-w-[80px] break-words`}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center w-full ">
        {/* Input and Selector Container */}
        <div className="fixed bottom-0 w-8/12 max-w-screen-lg mx-auto px-[80px] py-[16px]">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 bg-gray-100 rounded-full px-4 py-3 w-full"
          >
            {/* Language Selector */}
            <div className="w-[150px]">
              <select
                className="select select-bordered w-full h-full"
                value={finalLanguage}
                onChange={handleSelectedLanguage}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Text Input */}
            <input
              type="text"
              value={tempInput}
              onChange={(e) => setTempInput(e.target.value)}
              placeholder="Translate text..."
              className="flex-grow bg-transparent border-none outline-none text-gray-800 p-2"
            />

            {/* Submit Button */}
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
      </div>

      {isError && (
        <p className="error-message text-[1px]">An error occurred. Try again.</p>
      )}
    </div> 
         
        </div>
    
    
  );
};

export default Translator;
