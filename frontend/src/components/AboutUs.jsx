import React from "react";
import raspberryBackground from "/images/raspberryBackground.jpg";
import { motion } from "framer-motion";
const AboutUs = () => {
  return (
    <div className="relative mx-auto my-30 max-w-7xl rounded-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="font-dawn absolute top-15 left-1/2 -translate-x-1/2 text-white text-9xl z-20">
          About Us
        </h2>

        <h3 className="font-josefin absolute top-70 left-44 text-white text-4xl z-20">
          WELCOME TO MAGNOLIA KITCHEN RICHMOND, VA.
        </h3>

        <p className="font-josefin absolute top-100 text-center left-44 right-44 text-white text-3xl z-20">
          Where we strive to craft desserts that are delicious yet wholesome. We
          take pride in using real ingredients, flowers to decorate, and of
          course fruits.
        </p>
      </motion.div>

      {/* Image */}
      <img
        src={raspberryBackground}
        className="w-full h-[40rem] object-cover rounded-xl"
        alt="About Us Background"
      />

      {/* Overlay */}
      <div className="absolute inset-0 rounded-xl bg-[#74070E] opacity-80"></div>
    </div>
  );
};

export default AboutUs;
