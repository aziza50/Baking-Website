"use client";
import Images from "../../components/images";
import Typerwriter from "typewriter-effect";
import Image from "next/image";
import { crimson, dawn } from "../../styles/fonts";

export default function Portfolio() {
  return (
    <div className="px-4">
      <div className="flex flex-col pt-40 lg:flex-row justify-center items-center gap-5 lg:gap-50 mb-30 lg:pt-40 relative">
        <div className="flex flex-col items-start text-center z-10">
          <h1
            className={`${crimson.className} text-[#74070E] text-[60px] md:text-[80px] lg:text-[120px]`}
          >
            PORTFOLIO
          </h1>
          <h2
            className={`${dawn.className} text-black text-[30px] md:text-[40px] lg:text-[55px]`}
          >
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
              className="hidden sm:block rotate-200 w-75 h-22.5"
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
            className="hidden -mt-37.5 sm:block rotate-20 w-75 h-22.5"
            viewBox="0 0 441 104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M439.977 7.58488C443.478 -7.2311 50.7938 7.58488 37.7877 7.58488C24.7816 7.58488 -12.736 106.204 6.27288 100.648C25.2818 95.0917 417.466 108.056 422.969 100.648C428.471 93.2397 436.475 22.4009 439.977 7.58488Z"
              fill="#74070E"
            />
          </svg>

          <Image
            className="absolute w-12 top-75 right-37.5 md:w-16 lg:w-25 lg:top-87.5 lg:right-112.5 rotate-15"
            src="/images/ice_cream.png"
            alt="fruits"
            width={72}
            height={72}
          />
          <Image
            className="absolute w-22 right-12.5 md:w-16 lg:w-50 lg:top-125 lg:right-50 rotate-20"
            src="/images/jello.png"
            alt="roll"
            width={72}
            height={72}
          />
        </div>
      </div>

      <Images />
    </div>
  );
}
