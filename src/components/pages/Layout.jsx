import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import {
    Crown,
    Night,
  } from "../utils/assets";

  
  const Layout = () => {
    

    const navigateTo = useNavigate();

    const translatorNavigation = () => {
      navigateTo("translator");
    };

    const summarizerNavigation = () => {
      navigateTo("/");
    };

    return (
      <div className="flex">
        {/* Sidebar */}
        <div className="sidebar sticky top-0 flex flex-col justify-start gap-[20px] border-[1px] border-[#E2E8F0] w-[360px] h-screen">
          <div className="logo flex gap-[8px] items-center h-[80px] w-full px-[24px] py-[20px] border-[1px] border-[#CBD5E1]">
            <img src={Crown} className="w-[32px] h-[32px]" />
            <h1 className="text-[30px] leading-[30px] font-bold">iboT-GPT</h1>
          </div>
          <div className="program flex flex-col gap-[16px] p-2">
            <button onClick={summarizerNavigation} className="btn px-[24px] py-[12px] rounded-[8px] border-[1px] border-[#4F46E5] text-[16px] h-[48px] w-full focus:text-white  focus:bg-[#4F46E5]">
              Summarizer
            </button>
            <button onClick={translatorNavigation} className="btn px-[24px] py-[12px] rounded-[8px] border-[1px] border-[#4F46E5] text-[16px] h-[48px] w-full focus:text-white focus:bg-[#4F46E5]">
              Translator
            </button>
          </div>
        </div>
  
        {/* Main Content */}

        <Outlet/>
        
      </div>
    );
  };
  
  export default Layout;
  