"use client";
import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { josefin, dawn, crimson } from "../styles/fonts";
import { a } from "framer-motion/client";

export default function Testimonials() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 80, stiffness: 100 });
  const springY = useSpring(y, { damping: 80, stiffness: 100 });

  useEffect(() => {
    const onMouseHover = (event: MouseEvent) => {
      x.set(event.clientX * 0.02);
      y.set(event.clientY * 0.02);
    };

    window.addEventListener("mousemove", onMouseHover);

    return () => {
      window.removeEventListener("mousemove", onMouseHover);
    };
  }, []);
  return (
    <section className="max-w-6xl mx-auto mt-40 px-4 mb-20 flex flex-col md:flex-row gap-20">
      <div className="flex flex-col gap-12 relative flex-1">
        <div className="relative max-w-xl mx-auto">
          <motion.div style={{ x: springX, y: springY }}>
            <Image
              src="/images/cake.png"
              alt="Cake"
              className="absolute -top-12 -left-30 w-32 rotate-20"
              width={150}
              height={150}
            />
          </motion.div>
          <div className="flex flex-col items-end">
            <p
              className={`relative z-10 ${josefin.className} text-[20px] text-black p-20 rounded-lg`}
            >
              “Thank you @magnolia.kitchen.rva for these special treats #25 to
              thank my new build clients for their business 🩶🩶🩶. They were a
              huge hit! Cannot wait to see what #2025 brings.”
            </p>
            <h5 className={` ${dawn.className} text-2xl text-black mr-20`}>
              — Mandy
            </h5>
          </div>

          <motion.div style={{ x: springX, y: springY }}>
            <Image
              src="/images/ice_cream.png"
              alt="Ice Cream"
              className="absolute -bottom-7 -right-2 w-20 rotate-15"
              width={150}
              height={150}
            />
          </motion.div>
        </div>

        <div className="relative max-w-xl mx-auto">
          <motion.div style={{ x: springX, y: springY }}>
            <Image
              src="/images/pie.png"
              alt="Pie"
              className="absolute top-0 -left-30 w-32 rotate-[20deg]"
              width={150}
              height={150}
            />
          </motion.div>

          <div className="flex flex-col items-end">
            <p
              className={`relative z-10 ${josefin.className} text-[20px] text-black p-20 rounded-lg`}
            >
              “Local friends, @magnolia.kitchen.rva made this beautiful bday
              cake for me and eveyone was obsessed. Even all 3 of my kids liked
              it and that says a lot in itself 😍”
            </p>
            <h5
              className={`mt-4 text-right ${dawn.className} text-2xl text-black mr-20`}
            >
              — Kim
            </h5>
          </div>

          <motion.div style={{ x: springX, y: springY }}>
            <Image
              src="/images/jello.png"
              alt="Jello"
              className="bottom-0 absolute -right-15 w-35 rotate-15"
              width={150}
              height={150}
            />
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col">
        <h1
          className={`text-[#74070E] ${crimson.className} text-9xl ml-12.5 [writing-mode:vertical-rl] rotate-180`}
        >
          Testimonials
        </h1>
        <div className="relative h-100 border-l-5 border-[#74070E] -mt-87.5"></div>
      </div>
    </section>
  );
}
