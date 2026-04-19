"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Typerwriter from "typewriter-effect";
import AboutUs from "../components/about-us";
import Assortment from "../components/assortment";
import Testimonials from "../components/testimonials";
import { crimson, dawn, josefin } from "../styles/fonts";

export default function Home() {
  return (
    <>
      <div className="relative z-10 px-4 sm:px-8">
        <h1
          className={`text-3xl pt-24 sm:pt-32 ${crimson.className} text-center text-[#74070E] sm:text-6xl lg:text-[120px]`}
        >
          MAGNOLIA KITCHEN
        </h1>

        <div className="flex flex-col-reverse ml-27.5 sm:flex-row sm:gap-45 items-center">
          <div className="w-full sm:w-1/2">
            <h2
              className={`text-2xl sm:text-4xl lg:text-[55px] ${dawn.className} text-start text-black mb-4`}
            >
              <Typerwriter
                options={{
                  strings: ["fruitful & wholesome"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>
            <p
              className={`text-base sm:text-lg mt-6 sm:mt-10 ${josefin.className} text-black max-w-lg`}
            >
              Savor the European style inspired desserts with great emphasis on
              natural ingredients. Perfect for any occasion and we are so
              excited to share these special moments with you!
            </p>
          </div>
          <div className="w-full sm:w-auto sm:flex sm:justify-center sm:ml-[-40px] lg:ml-[-100px]">
            <img
              src="https://folioimagess.s3.us-east-1.amazonaws.com/public/good13.jpg"
              className="w-full sm:w-auto h-60 sm:h-80 lg:h-[25rem] rounded-4xl object-cover my-6 sm:mb-0"
              alt="Cake"
            />
          </div>
        </div>
      </div>

      <motion.div
        className="hidden md:block absolute top-80 left-2"
        style={{ originX: 0.5, originY: 0.5 }}
        animate={{ rotate: [-8, 8] }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/raspberry.png"
          alt="Raspberry"
          width={160}
          height={160}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </motion.div>
      <motion.div
        className="hidden md:block absolute top-60 right-10"
        animate={{ rotate: [8, -8] }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/raspberry.png"
          alt="Raspberry"
          width={160}
          height={160}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </motion.div>
      <motion.div
        className="hidden md:block absolute top-150 left-160"
        animate={{ rotate: [-5, 5] }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/raspberry.png"
          alt="Raspberry"
          width={160}
          height={160}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </motion.div>

      <motion.div
        className="hidden md:block absolute top-150 right-5"
        animate={{ rotate: [-5, 5] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/cherry.png"
          alt="Cherry"
          width={130}
          height={130}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </motion.div>

      <motion.div
        className="hidden md:block absolute top-140 left-5 w-28 md:w-40 h-auto"
        animate={{ rotate: [-5, 5] }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/cherry.png"
          alt="Cherry"
          width={150}
          height={150}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </motion.div>

      <AboutUs />

      <Assortment />

      <Testimonials />
    </>
  );
}
