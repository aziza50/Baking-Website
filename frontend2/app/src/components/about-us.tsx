"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { dawn, josefin } from "../styles/fonts";

export default function AboutUs() {
  return (
    <div className="relative my-30 max-w-xl sm:max-w-4xl md:max-w-6xl lg:max-w-10xl rounded-xl overflow-hidden px-4 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2
          className={`absolute top-10 md:top-15 text-center left-0 w-full text-white text-8xl z-20 px-4 ${dawn.className}`}
        >
          About Us
        </h2>

        <h3
          className={`absolute top-40 sm:top-50 sm:text-3xl md:top-60 md:text-4xl lg:top-70 lg:text-3xl w-full text-center text-white z-20 px-10 ${josefin.className}`}
        >
          WELCOME TO MAGNOLIA KITCHEN RICHMOND, VA.
        </h3>

        <p
          className={`font-josefin absolute top-70 text-xl sm:top-80 md:top-90 lg:top-100 w-full text-center text-white sm:text-2xl md:text-3xl lg:text-3xl z-20 px-10 sm:px-8 md:px-12 ${josefin.className}`}
        >
          Where we strive to craft desserts that are delicious yet wholesome. We
          take pride in using real ingredients, flowers to decorate, and of
          course fruits.
        </p>
      </motion.div>

      {/* Image */}
      <Image
        src="/images/raspberryBackground.jpg"
        className="w-full h-120 sm:h-120 md:h-160 lg:h-160 object-cover rounded-xl"
        alt="About Us Background"
        width={1200}
        height={800}
      />

      {/* Overlay */}
      <div className="absolute inset-y-0 inset-x-4 rounded-xl bg-[#74070E] opacity-90"></div>
    </div>
  );
}
