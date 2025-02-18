import { useEffect, useState } from "react";

const App = () => {
  const [textInput, setTextInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const initSummarizer = async () => {
      // Check if self.ai is available
      if (typeof self === "undefined" || !self.ai) {
        setIsError(true);
        return;
      };

      // Check if summarizer exists
      if (!self.ai.summarizer) {
        console.error("self.ai.summarizer is undefined.");
        setIsError(true);
        return;
      }

      const options = {
        sharedContext:
          "Fela Anikulapo Kuti The name itself resonates with power rebellion and a vibrant infectious rhythm More than just a musician Fela was a revolutionary a pan-Africanist and a fearless voice for the oppressed He wasnt just playing music he was telling stories exposing corruption and igniting a fire in the hearts of his listeners Felas Afrobeat a potent mix of jazz funk highlife and traditional Yoruba rhythms was a genre unto itself It was complex hypnotic and undeniably danceable But beneath the infectious grooves lay a powerful message Felas lyrics often delivered in a mix of Yoruba and Pidgin English tackled issues like political corruption neocolonialism and social injustice He wasnt afraid to speak truth to power even when it meant facing persecution and danger He challenged the status quo earning him the moniker Abami Eda The Strange One His Kalakuta Republic a commune and recording studio became a haven for artists musicians and activists It was a place where creativity flourished and where Felas message of resistance was amplified Felas influence extends far beyond music He inspired generations of artists and activists across the globe His fearless spirit his unwavering commitment to social justice and his innovative musical style continue to resonate today He showed us the power of music to challenge to inspire and to unite Fela Kuti wasnt just a legend He was a force of nature His music is a testament to the power of art to effect change a reminder that even in the face of adversity the human spirit can rise can resist and can dance His legacy lives on not just in his music but in the countless individuals he inspired to fight for a better world He remains a symbol of rebellion a champion of the people and an eternal inspiration Long live Fela Anikulapo Kuti",
        type: "key-points",
        format: "markdown",
        length: "medium",
      };

      try {
        setIsLoading(true);
        setIsError(false);

        // Check API capabilities
        const apiCheck = await self.ai.summarizer.capabilities();

        if (!apiCheck || apiCheck.available === "no") {
          return;
        };
        
        // create summary
        const summarizer = await self.ai.summarizer.create();

        if (apiCheck.available === "readily") {
          const summary = await summarizer.summarize(options.sharedContext);
          setTextInput(summary || "No summary generated.");
        } else {
          //download model if apicheck.available === "after-download"
          summarizer.addEventListener("downloadprogress", (e) => {
            console.log(` Download progress: ${e.loaded} / ${e.total}`);
          });

          await summarizer.ready;

          //generating summary after downoad is completed
          const summary = await summarizer.summarize(options.sharedContext);
          console.log(" Summary after download:", summary);
          setTextInput(summary || "No summary generated.");
        }
      } catch (error) {
        console.error(" Error fetching summary:", error)
        setIsError(true);
      } finally {
        setIsLoading(false);
        console.log(" Summarization process complete.");
      }
    };

    initSummarizer();
  }, []);

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Error occurred</h1>
      ) : (
        <p>{textInput}</p>
      )}
    </div>
  );
};

export default App;
