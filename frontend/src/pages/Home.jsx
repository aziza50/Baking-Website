import React from "react";
import NavBar from "../components/NavBar";
import raspberry from "/images/raspberry.png";
import cherry from "/images/cherry.png";
import { motion } from "framer-motion";
import Typerwriter from "typewriter-effect";
import AboutUs from "../components/AboutUs";
import Assortment from "../components/Assortment";
import Testimonials from "../components/Testimonials";
import Order from "../components/Order";
import Footer from "../components/Footer";
("use client");

const Home = () => {
  return (
    <>
      <div className="relative z-10 px-4 sm:px-8">
        <h1 className="text-3xl pt-24 sm:pt-32 font-crimson text-center text-[#74070E] sm:text-6xl lg:text-[120px]">
          MAGNOLIA KITCHEN
        </h1>

        <div className="flex flex-col-reverse ml-[110px] sm:flex-row sm:gap-45 items-center">
          <div className="w-full sm:w-1/2">
            <h2 className="text-2xl sm:text-4xl lg:text-[55px] font-dawn text-start text-black mb-4">
              <Typerwriter
                options={{
                  strings: ["fruitful & wholesome"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>
            <p className="text-base sm:text-lg mt-6 sm:mt-10 font-josefin text-black max-w-lg">
              Savor the European style inspired desserts with great emphasis on
              natural ingredients. Perfect for any occasion and we are so
              excited to share these special moments with you!
            </p>
          </div>
          <div className="w-full sm:w-auto sm:flex sm:justify-center sm:ml-[-40px] lg:ml-[-100px]">
            <img
              src="https://folioimagess.s3.us-east-1.amazonaws.com/public/good13.jpg"
              className="w-full sm:w-auto h-60 sm:h-80 lg:h-[28rem] rounded-xl object-cover mb-6 sm:mb-0"
              alt="Cake"
            />
          </div>
        </div>
      </div>

      {/* Decorative images - hide on mobile, show on md+ */}
      <motion.img
        src={raspberry}
        className="hidden md:block absolute top-[20rem] left-2 w-28 md:w-40 h-auto"
        animate={{ rotate: [-15, 15] }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.img
        src={raspberry}
        className="hidden md:block absolute top-[40rem] left-[40rem] w-28 md:w-40 h-auto"
        animate={{ rotate: [10, -10] }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.img
        src={cherry}
        className="hidden md:block absolute top-[40rem] right-10 w-28 md:w-40 h-auto"
        animate={{ rotate: [-5, 5] }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.img
        src={cherry}
        className="hidden md:block absolute top-[38rem] left-[5rem] w-20 md:w-30 h-auto"
        animate={{ rotate: [-5, 5] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.img
        src={cherry}
        className="hidden md:block absolute top-[18rem] right-[5rem] w-20 md:w-30 h-auto"
        animate={{ rotate: [-5, 5] }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <AboutUs />

      <Assortment />

      <Testimonials />
      <div id="order">
        <Order />
      </div>
    </>
  );
};

export default Home;
