import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { Crown } from "../utils/assets";

const Layout = () => {
  const navigate = useNavigate();

  // Function to navigate to Summarizer page
  const goToSummarizer = () => {
    navigate("/");
  };

  // Function to navigate to Translator page
  const goToTranslator = () => {
    navigate("translator");
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <div
        className="sidebar md:sticky md:top-0 flex md:flex-col justify-between md:justify-start md:gap-5 border border-[#E2E8F0] w-full md:w-[360px] md:h-screen bg-white shadow-md"
        role="navigation"
        aria-label="Main navigation"
        tabIndex="0"
      >
        {/* Logo Section */}
        <div className="logo flex items-center gap-[8px] md:h-20 md:px-6 md:py-5 border-b border-[#CBD5E1] flex-nowrap">
          <img src={Crown} className="w-[32px] h-[32px]" alt="iboT-GPT Logo" />
          <h1 className="hidden md:block text-base md:text-2xl font-bold whitespace-nowrap">
            iboT-GPT
          </h1>
        </div>

        {/* Navigation Buttons */}
        <div className="program flex md:flex-col gap-2 md:gap-4 p-1 md:p-2 w-9/12 md:w-full justify-center">
          <button
            onClick={goToSummarizer}
            onKeyDown={(e) => e.key === "Enter" && goToSummarizer()}
            className="btn px-4 py-2 md:px-6 md:py-3 rounded-md border border-[#4F46E5] text-sm md:text-base w-auto md:w-full focus:text-white focus:bg-[#4F46E5] transition duration-300"
            aria-label="Go to Summarizer"
          >
            Summarizer
          </button>
          <button
            onClick={goToTranslator}
            onKeyDown={(e) => e.key === "Enter" && goToTranslator()}
            className="btn px-4 py-2 md:px-6 md:py-3 rounded-md border border-[#4F46E5] text-sm md:text-base w-auto md:w-full focus:text-white focus:bg-[#4F46E5] transition duration-300"
            aria-label="Go to Translator"
          >
            Translator
          </button>
        </div>
      </div>

      {/* Main Content */}
      <Outlet />
    </div>
  );
};

export default Layout;
