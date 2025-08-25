import React from "react";
import Images from "../components/Images";
import Typerwriter from "typewriter-effect";
import ice_cream from "/images/ice_cream.png";
import jello from "/images/jello.png";

const Portfolio = () => {
  return (
    <div className="px-4">
      <div className="flex flex-col pt-40 lg:flex-row justify-center items-center gap-5 lg:gap-50 mb-30 lg:pt-40 relative">
        <div className="flex flex-col items-start text-center z-10">
          <h1 className="font-crimson text-[#74070E] text-[60px] md:text-[80px] lg:text-[120px]">
            PORTFOLIO
          </h1>
          <h2 className="font-dawn text-black text-[30px] md:text-[40px] lg:text-[55px]">
            <Typerwriter
              options={{
                strings: ["fruitful & wholesome"],
                autoStart: true,
                loop: true,
              }}
            />
          </h2>
          <div className="flex flex-col items-center mt-16">
            <svg
              className="hidden sm:block rotate-[200deg] w-[300px] h-[90px]"
              viewBox="0 0 441 104"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M439.977 7.58488C443.478 -7.2311 50.7938 7.58488 37.7877 7.58488C24.7816 7.58488 -12.736 106.204 6.27288 100.648C25.2818 95.0917 417.466 108.056 422.969 100.648C428.471 93.2397 436.475 22.4009 439.977 7.58488Z"
                fill="#74070E"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <svg
            className="hidden mt-[-150px] sm:block rotate-[20deg] w-[300px] h-[90px]"
            viewBox="0 0 441 104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M439.977 7.58488C443.478 -7.2311 50.7938 7.58488 37.7877 7.58488C24.7816 7.58488 -12.736 106.204 6.27288 100.648C25.2818 95.0917 417.466 108.056 422.969 100.648C428.471 93.2397 436.475 22.4009 439.977 7.58488Z"
              fill="#74070E"
            />
          </svg>

          <img
            className="absolute w-12 top-[300px] right-[150px] md:w-16 lg:w-25 lg:top-[350px] lg:right-[450px] rotate-[15deg]"
            src={ice_cream}
            alt="fruits"
          />
          <img
            className="absolute w-22 right-[50px] md:w-16 lg:w-50 lg:top-[500px] lg:right-[200px] rotate-[20deg]"
            src={jello}
            alt="roll"
          />
        </div>
      </div>

      <Images />
    </div>
  );
};

export default Portfolio;
