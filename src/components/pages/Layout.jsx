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
        <div className="main flex flex-col flex-grow">
          {/* Header */}
          <div className="header sticky top-0 bg-white flex justify-center flex-col h-[80px] px-[32px] py-[20px] gap-[10px] border-[1px] border-[#CBD5E1]">
            <div className="flex items-center justify-center">
              <div className="lightmode flex-1">
                <img src={Night} className="w-[24px] h-[24px]" />
              </div>
              <h1 className="title flex-1 font-bold text-[30px]">Summarizer</h1>
            </div>
          </div>
  
          {/* Chat Section */}
            <Outlet />
         
        </div>
      </div>
    );
  };
  
  export default Layout;
  