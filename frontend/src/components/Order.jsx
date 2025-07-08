import React from "react";
import { Input, Button } from "@material-tailwind/react";
import raspberryBackground from "/images/raspberryBackground.jpg";
import { motion } from "framer-motion";
import { useState } from "react";
const Order = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", "77a3c1e2-62f6-4451-9278-bd96a6d0d5e9");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div className="relative mx-auto my-30 max-w-7xl rounded-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="font-dawn absolute top-10 left-1/2 -translate-x-1/2 text-white text-9xl z-30">
          Order
        </h2>

        <img
          src={raspberryBackground}
          className="w-full h-[50rem] object-cover rounded-xl"
          alt="About Us Background"
        />

        <div className="absolute inset-0 bg-[#74070E] opacity-80 z-20 rounded-xl"></div>

        <div className="absolute inset-0 flex flex-row justify-center items-center z-30 px-10">
          <div className="flex flex-col items-center mr-10">
            <div className="font-dawn font-light text-white text-3xl mb-4">
              Note: we only accept cash or venmo!
            </div>
            <svg
              width="100"
              height="190"
              viewBox="0 0 291 490"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-90"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
                d="M7.99988 489C7.99988 489 -12.0001 338 39.4999 279C90.9999 220 298 314 229.5 220C161 126 222.75 53.75 229.5 8.49997M229.5 8.49997C246 -13.5 148 59.5003 148 59.5003L229.5 8.49997ZM229.5 8.49997L287.5 69"
                stroke="white"
                stroke-width="100"
              />
            </svg>
          </div>

          <form
            onSubmit={onSubmit}
            className="mt-45 bg-white/90 backdrop-blur-md p-10 rounded-xl shadow-lg max-w-md w-full flex flex-col gap-6"
          >
            <h6 className="text-lg font-semibold font-crimson">Your Name</h6>
            <Input
              name="name"
              type="text"
              size="lg"
              className="bg-white/40 rounded-2xl font-crimson"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <h6 className="text-lg font-semibold font-crimson">Your Email</h6>
            <Input
              name="email"
              type="email"
              size="lg"
              className="bg-white/40 rounded-2xl font-crimson"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <h6 className="text-lg font-semibold font-crimson">
              Date of Event
            </h6>
            <Input
              name="date"
              type="date"
              size="lg"
              className="bg-white/40 rounded-2xl font-crimson"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <h6 className="text-lg font-semibold font-crimson">Your Wishes</h6>
            <Input
              name="request"
              type="text"
              size="lg"
              className="bg-white/40 rounded-2xl font-crimson"
              rows="6"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Button
              type="submit"
              className="mt-6 text-[15px] font-crimson text-[#74070E]"
            >
              Send Request
            </Button>
            <p className="mt-3 font-crimson text-[13px]">{result}</p>
          </form>

          <div className="flex flex-col items-center ml-10">
            <div className="font-dawn font-light text-white text-3xl mb-4">
              24-hour notice required!
            </div>

            <svg
              width="300"
              height="200"
              viewBox="0 0 244 436"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
                d="M8.00069 434.5C-34.913 300.219 285.673 330.519 145.456 270.5C5.23999 210.481 239.51 6 239.51 6M239.51 6L150.192 53.0961M239.51 6L239.511 88.1922"
                stroke="white"
                stroke-width="7"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Order;
