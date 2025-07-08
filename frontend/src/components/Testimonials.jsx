import React from "react";
import raspberry from "/images/raspberry.png";
import cherry from "/images/cherry.png";

const Testimonials = () => {
  return (
    <div className="flex items-start justify-center gap-100 mt-40 max-w-[1200px] mx-auto">
      <div className="relative flex flex-col">
        <div>
          <div className=" ml-[0px]">
            <img className="w-auto h-20" src={raspberry}></img>
          </div>
          <p className="font-josefin text-[20px] text-black">
            Bought a vanilla cake! Absolute gorgeous and was a hit of the party.
            Loved the lemond curd and raspberry combo! First time ordering from
            Magnolia Kitchen and certainly not the last!!!
          </p>
          <h5 className="font-dawn text-2xl text-black text-end">Julia</h5>
        </div>
        <div>
          <div>
            <img className="w-auto h-20" src={cherry}></img>
          </div>
          <p className="font-josefin text-[20px] text-black">
            Was in search of a cute number cake for my daughter's birthday.
            Never have to look again. The most gorgeous number cakes. Five stars
            from me!
          </p>
          <h5 className="font-dawn text-2xl text-black text-end">Hannah</h5>
        </div>
        <div>
          <p className="font-josefin text-[20px] text-black">
            Love that the desserts are not overly sweet with lots of natural
            sweeteners like the fruits! Delicious! Coming back for more!
          </p>
          <h5 className="font-dawn text-2xl text-black text-end">Michelle</h5>
          <div>
            <img className="w-auto h-20" src={raspberry}></img>
          </div>
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
