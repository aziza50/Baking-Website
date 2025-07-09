import React from "react";
import raspberry from "/images/raspberry.png";
import cherry from "/images/cherry.png";

const Testimonials = () => {
  return (
    <div className="flex items-start justify-center gap-150 mt-40 max-w-[1200px] mx-auto">
      <div className="relative mt-40 flex flex-col text-center max-w-md">
        <div className="flex flex-row">
          <svg
            width="400"
            height="200"
            viewBox="0 0 828 794"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M445.369 12.3252C281.729 -19.6014 197.83 12.3253 123.001 155.01C48.1719 297.695 -75.7867 514.481 65.5564 661.895C206.899 809.31 485.051 832.565 675.146 730.873C865.242 629.181 772.273 477.43 821.025 320.95C869.777 164.47 609.01 44.2519 445.369 12.3252Z"
              fill="#74070E"
              opacity={0.9}
              stroke="black"
            />
          </svg>
          <img
            className="top-[20px] left-[40px] absolute w-auto h-20 mb-4 z-10"
            src={raspberry}
          ></img>
          <p className="absolute w-90 bottom-[-80px] left-[200px] font-josefin text-[20px] text-black z-10">
            Bought a vanilla cake! Absolute gorgeous and was a hit of the party.
            Loved the lemond curd and raspberry combo! First time ordering from
            Magnolia Kitchen and certainly not the last!!!
          </p>
          <h5 className="absolute right-[-180px] bottom-[-130px] mt-4 z-10 font-dawn text-2xl text-black text-end">
            Julia
          </h5>
        </div>
      </div>
      <div className="flex flex-col gap-10 ">
        <h1 className="text-[#74070E] font-crimson text-9xl [writing-mode:vertical-rl] rotate-180">
          Testimonials
        </h1>
        <div className="relative h-[400px] border-l-5 border-[#74070E] mt-[-350px]"></div>
      </div>
    </div>
  );
};

export default Testimonials;
