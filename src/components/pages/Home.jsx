import { Crown, Night } from "../utils/assets";

const Home = () => {
  return (
    <div className="flex">
      <div className="sidebar flex flex-col justify-start gap-[20px] border-[1px] border-[#E2E8F0] w-[360px] h-screen">
        <div className="logo flex gap-[8px] items-center h-[80px] w-full px-[24px] py-[20px] border-[1px] border-[#CBD5E1]">
          <img src={Crown} className="gap-[8px]  w-[32px] h-[32px]" />
          <h1 className="text-[30px] leading-[30px] font-bold">iboT-GPT</h1>
        </div>
        <div className="program flex flex-col gap-[16px] p-2">
          <button className="btn px-[24px] py-[12px] gap-[8px] rounded-[8px] border-[1px] border-[#4F46E5] text-[16px] h-[48px] w-full focus:text-white focus:bg-[#4F46E5]">
            Summarizer
          </button>
          <button className="btn px-[24px] py-[12px] gap-[8px] rounded-[8px] border-[1px] border-[#4F46E5] text-[16px] h-[48px] w-full focus:text-white focus:bg-[#4F46E5]">
            Translator
          </button>
        </div>
      </div>

      <div className="main flex flex-col w-full">
        <div className="header flex  justify-center  flex-col h-[80px] px-[32px] py-[20px] gap-[10px] border-[1px] border-[#CBD5E1]">
          <div className="flex items-center justify-center">
            <div className="lightmode flex-1 ">
              <img src={Night} className="w-[24px] h-[24px]" />
            </div>

            <h1 className="title flex-1 font-bold text-[30px]">Summarizer</h1>
          </div>
        </div>

        {/* the programs to be imported here */}
        <div className="chat flex items-center justify-center px-[96px] py-[32px] gap-[24px]">
         <div className="userinput flex flex-col justify-end w-[808px] h-[78px] gap-[12px] ">
            <p className="font-bold">You</p>
            <p className=" flex w-2/5 rounded-[24px] p-[12px] gap-[10px] bg-[#F8FAFC]"> do android really dream</p>
        </div>   
        </div>
      </div>
    </div>
  );
};

export default Home;
