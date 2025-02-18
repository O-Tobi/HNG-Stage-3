import { AiAvatar, Crown, Night, UserAvatar } from "../utils/assets";

const Home = () => {
  return (
    <div className="flex">
      <div className="sidebar sticky-0 flex flex-col justify-start gap-[20px] border-[1px] border-[#E2E8F0] w-[360px] h-screen">
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
        <div className="chat flex flex-col items-center px-[96px] py-[32px] gap-[24px]">
          {/* User 1 (Right-aligned) */}
          <div className="userinput flex justify-end gap-2 w-full">
            <div className="flex flex-col items-end  max-w-[808px]">
              <p className="font-bold text-right">You</p>
              <p className="bg-[#F8FAFC] rounded-[24px] p-[12px] pr-0  gap-[10px] w-fit">
                Do androids really dream? You can achieve this chat layout by
                using flex with justify-end for user1 (right-aligned) and
                justify-start for user2 (left-aligned). Here's a more structured
                approach using Tailwind CSS:
              </p>
            </div>
            <div>
              <img src={UserAvatar} alt="" className="w-[48px] h-[48px]" />
            </div>
          </div>

          {/* User 2 (Left-aligned) */}
          <div className="userinput flex items-start gap-2 justify-start w-full">
            <div>
              <img src={AiAvatar} alt="" className="w-[48px] h-[48px]" />
            </div>

            <div className="flex flex-col items-start max-w-[808px]">
              <p className="font-bold text-left">User 2</p>
              <p className="bg-[#F8FAFC] rounded-[24px] p-[12px] gap-[10px] w-fit">
                You can achieve this chat layout by using flex with justify-end
                for user1 (right-aligned) and justify-start for user2
                (left-aligned). Here's a more structured approach using Tailwind
                CSS:
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
