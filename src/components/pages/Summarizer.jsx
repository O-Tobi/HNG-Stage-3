import { useEffect, useState } from "react";

const Summarizer = () => {
  const [textInput, setTextInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tempInput, setTempInput] = useState(""); // Temporary input storage

  useEffect(() => {
    const initSummarizer = async () => {
      try {
        // Ensure self.ai is available
        if (typeof self === "undefined" || !self.ai) {
          setIsError(true);
          return;
        }
  
        // Ensure summarizer exists
        if (!self.ai.summarizer) {
          console.error("self.ai.summarizer is undefined.");
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
  
        // Check API capabilities
        const apiCheck = await self.ai.summarizer.capabilities();
        if (!apiCheck || apiCheck.available === "no") {
          setIsError(true);
          return;
        }
  
        // Create summarizer instance
        const summarizer = await self.ai.summarizer.create();
        if (!summarizer) {
          console.error("Failed to create summarizer.");
          setIsError(true);
          return;
        }
  
        if (apiCheck.available === "readily") {
          const summary = await summarizer.summarize(options.sharedContext);
  
          if (summary && typeof summary[Symbol.asyncIterator] === "function") {
            let result = "";
            let previousChunk = "";
  
            for await (const chunk of summary) {
              const newChunk = chunk.startsWith(previousChunk)
                ? chunk.slice(previousChunk.length)
                : chunk;
              console.log(newChunk);
              result += newChunk;
              previousChunk = chunk;
            }
  
            console.log("Final Summary:", result);
            setTextInput(result || "No summary generated.");
          } else {
            console.log("Summary:", summary);
            setTextInput(summary || "No summary generated.");
          }
        } else {
          // Timeout mechanism for downloading the model
          const TIMEOUT_DURATION = 60000; // 60 seconds
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Model download timeout")), TIMEOUT_DURATION)
          );
  
          summarizer.addEventListener("downloadprogress", (e) => {
            console.log(`Download progress: ${e.loaded} / ${e.total}`);
          });
  
          try {
            await Promise.race([summarizer.ready, timeoutPromise]);
  
            // Generate summary after download
            const summary = await summarizer.summarize(options.sharedContext);
            console.log("Summary after download:", summary);
            setTextInput(summary || "No summary generated.");
          } catch (error) {
            console.error("Error during model download:", error);
            setIsError(true);
          }
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
        console.log("Summarization process complete.");
      }
    };
  
    if (textInput) {
      initSummarizer();
    }
  }, [textInput]);
  

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    setTextInput(tempInput); // Update displayed text on submit
  };

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Error occurred</h1>
      ) : (
        <>
          <p>{textInput}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setTempInput(e.target.value)} // Store input temporarily
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Summarizer;
