import React from "react";
import CakeImage from "/images/cakes.jpg";
import NumberCakes from "/images/numberCakes.jpg";
import Gathering from "/images/gatherings.jpg";
import Sourdough from "/images/sourdough.jpg";
const Assortment = () => {
  return (
    <div className="flex items-start justify-center gap-40 mt-40 max-w-[1200px] mx-auto">
      <div className="flex flex-col ">
        <h1 className="text-[#74070E] font-crimson text-9xl ml-[-180px] [writing-mode:vertical-rl] rotate-180">
          Assortment
        </h1>
        <div className="relative h-[400px] border-l-5 border-[#74070E] mt-[-350px]"></div>
      </div>

      <div className="grid grid-cols-2 gap-30">
        <div className="relative w-72 h-72 flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <img
            src={CakeImage}
            className="w-72 h-72 object-cover rounded-full"
          />
          <svg viewBox="0 0 300 300" className="absolute w-100 h-100">
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
                fill="none"
              />
            </defs>
            <text fill="#74070E" fontSize="40" className="font-dawn">
              <textPath href="#circlePath" startOffset="20%">
                Specialty Cakes
              </textPath>
            </text>
          </svg>
        </div>

        <div className="relative w-72 h-72 flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <img
            src={NumberCakes}
            className="w-72 h-72 object-cover rounded-full"
          />
          <svg viewBox="0 0 300 300" className="absolute w-100 h-100">
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
                fill="none"
              />
            </defs>
            <text fill="#74070E" fontSize="40" className="font-dawn">
              <textPath href="#circlePath" startOffset="20%">
                Number Cakes
              </textPath>
            </text>
          </svg>
        </div>

        <div className="relative w-72 h-72 flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <img
            src={Sourdough}
            alt="Cake"
            className="w-72 h-72 object-cover rounded-full"
          />
          <svg viewBox="0 0 300 300" className="absolute w-100 h-100">
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
                fill="none"
              />
            </defs>
            <text fill="#74070E" fontSize="40" className="font-dawn">
              <textPath href="#circlePath" startOffset="20%">
                Sourdough
              </textPath>
            </text>
          </svg>
        </div>

        <div className="relative w-72 h-72 flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <img
            src={Gathering}
            className="w-72 h-72 object-cover rounded-full"
          />
          <svg viewBox="0 0 300 300" className="absolute w-100 h-100">
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
                fill="none"
              />
            </defs>
            <text fill="#74070E" fontSize="40" className="font-dawn">
              <textPath href="#circlePath" startOffset="20%">
                Parties & Gatherings
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Assortment;
