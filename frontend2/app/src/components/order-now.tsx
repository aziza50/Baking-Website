"use client";
import Marquee from "react-fast-marquee";
import { dawn } from "../styles/fonts";
const OrderNow = () => {
  return (
    <div>
      <Marquee
        className={`${dawn.className} text-5xl text-[#74070E] overflow-hidden m-10`}
      >
        Order Now * Order Now * Order Now * Order Now * Order Now * Order Now
      </Marquee>
    </div>
  );
};

export default OrderNow;
