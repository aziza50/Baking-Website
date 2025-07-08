import React from "react";
import NavBar from "../components/NavBar";
import cakeImage from "/images/homepageImage.jpg";
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
      <NavBar />

      <div className="relative min-h-screen overflow-x-hidden bg-[url('/images/pape.webp')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-white opacity-20"></div>

        <div className="relative z-10">
          <h1 className="pt-30 font-crimson text-center text-[#74070E] text-[120px]">
            MAGNOLIA KITCHEN
          </h1>

          <div className="flex flex-wrap justify-between gap-20">
            <div>
              <h2 className="ml-33 font-dawn text-start text-black text-[45px]">
                <Typerwriter
                  options={{
                    strings: ["fruitful & wholesome"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h2>{" "}
              <p className="mt-20 ml-30 font-josefin text-[20px] text-black max-w-lg">
                Savor the European style inspired desserts with great emphasis
                on natural ingredients. Perfect for any occasion and we are so
                excited to share these special moments with you!
              </p>
            </div>

            <img
              src={cakeImage}
              className="h-[28rem] w-auto rounded-xl mr-45"
              alt="Cake"
            />
          </div>
        </div>

        <motion.img
          src={raspberry}
          className="absolute top-[20rem] left-2 w-40 h-auto"
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
          className="absolute top-[30rem] left-[40rem] w-40 h-auto"
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
          className="absolute top-[40rem] right-10 w-40 h-auto"
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
          className="absolute top-[38rem] left-[5rem] w-30 h-auto"
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
          className="absolute top-[18rem] right-[5rem] w-30 h-auto"
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

        <Order />

        <Footer />
      </div>
    </>
  );
};

export default Home;
