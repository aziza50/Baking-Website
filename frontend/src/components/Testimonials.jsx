import React from "react";
import jello from "/images/jello.png";
import pie from "/images/pie.png";
import ice_cream from "/images/ice_cream.png";
import cake from "/images/cake.png";
import { useState, useEffect } from "react";
import { MotionConfig, useMotionValue, useSpring } from "framer-motion";
import { motion } from "framer-motion";

const Testimonials = () => {
  const x = useMotionValue(0);

  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 80, stiffness: 100 });
  const springY = useSpring(y, { damping: 80, stiffness: 100 });

  useEffect(() => {
    const onMouseHover = (event) => {
      x.set(event.clientX * 0.02);
      y.set(event.clientY * 0.02);
    };

    window.addEventListener("mousemove", onMouseHover);

    return () => {
      window.removeEventListener("mousemove", onMouseHover);
    };
  }, []);
  return (
    <section className="max-w-6xl mx-auto mt-40 px-4 flex flex-col md:flex-row gap-20">
      <div className="flex flex-col gap-12 relative flex-1">
        <div className="relative max-w-xl mx-auto">
          <motion.img
            src={cake}
            alt="Cake"
            style={{ x: springX, y: springY }}
            className="absolute -top-12 -left-30 w-32 rotate-[20deg]"
          />
          <p className="relative z-10 font-josefin text-[20px] text-black p-20 rounded-lg">
            “Thank you @magnolia.kitchen.rva for these special treats #25 to
            thank my new build clients for their business 🩶🩶🩶. They were a huge
            hit! Cannot wait to see what #2025 brings.”
            <h5 className="mt-4 text-right font-dawn text-2xl text-black">
              — Mandy
            </h5>
          </p>

          <motion.img
            src={ice_cream}
            style={{ x: springX, y: springY }}
            alt="Ice Cream"
            className="absolute -bottom-7 -right-2 w-20 rotate-[15deg]"
          />
        </div>

        <div className="relative max-w-xl mx-auto">
          <motion.img
            style={{ x: springX, y: springY }}
            src={pie}
            alt="Pie"
            className="absolute -top-0 -left-30 w-32 rotate-[20deg]"
          />

          <p className="relative z-10 font-josefin text-[20px] text-black p-20 rounded-lg">
            “Local friends, @magnolia.kitchen.rva made this beautiful bday cake
            for me and eveyone was obsessed. Even all 3 of my kids liked it and
            that says a lot in itself 😍”
            <h5 className="mt-4 text-right font-dawn text-2xl text-black">
              — Kim
            </h5>
          </p>

          <motion.img
            src={jello}
            alt="Jello"
            style={{ x: springX, y: springY }}
            className="top-[250px] absolute -right-5 w-35 rotate-[15deg]"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className="text-[#74070E] font-crimson text-9xl ml-[50px] [writing-mode:vertical-rl] rotate-180">
          Testimonials
        </h1>
        <div className="relative h-100 border-l-5 border-[#74070E] mt-[-350px]"></div>
      </div>
    </section>
  );
};

export default Testimonials;
