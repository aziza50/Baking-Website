"use client";
import { josefin } from "@/styles/fonts";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const page = () => {
  const router = useRouter();
  return (
    <div className="h-screen gap-20 flex-col flex mt-[-200px] items-center justify-center">
      <div className="flex flex-row text-[#74070E] text-2xl mt-0">
        <div>Shopping Cart</div>
        <svg
          width="83"
          height="15"
          viewBox="0 0 83 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-10 mt-2"
        >
          <path
            opacity="0.4"
            d="M82.7071 8.07106C83.0976 7.68054 83.0976 7.04737 82.7071 6.65685L76.3431 0.292885C75.9526 -0.0976396 75.3195 -0.0976396 74.9289 0.292885C74.5384 0.683409 74.5384 1.31657 74.9289 1.7071L80.5858 7.36395L74.9289 13.0208C74.5384 13.4113 74.5384 14.0445 74.9289 14.435C75.3195 14.8255 75.9526 14.8255 76.3431 14.435L82.7071 8.07106ZM0 7.36395V8.36395H82V7.36395V6.36395H0V7.36395Z"
            fill="#74070E"
          />
        </svg>

        <div>Contact</div>
        <svg
          width="83"
          height="15"
          viewBox="0 0 83 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-10 mt-2"
        >
          <path
            opacity="0.4"
            d="M82.7071 8.07106C83.0976 7.68054 83.0976 7.04737 82.7071 6.65685L76.3431 0.292885C75.9526 -0.0976396 75.3195 -0.0976396 74.9289 0.292885C74.5384 0.683409 74.5384 1.31657 74.9289 1.7071L80.5858 7.36395L74.9289 13.0208C74.5384 13.4113 74.5384 14.0445 74.9289 14.435C75.3195 14.8255 75.9526 14.8255 76.3431 14.435L82.7071 8.07106ZM0 7.36395V8.36395H82V7.36395V6.36395H0V7.36395Z"
            fill="#74070E"
          />
        </svg>

        <div>Payment</div>
      </div>

      <div className="flex flex-row gap-90">
        <div
          className={`flex flex-col text-[#74070E] text-2xl ${josefin.className}`}
        >
          <h1 className="font-medium-bold text-3xl">Shopping Cart</h1>
          <line className="border-t border-[#74070E]/20 my-4" />
          <div className="flex flex-row gap-10">
            <Image
              src="https://folioimagess.s3.us-east-1.amazonaws.com/public/good13.jpg"
              alt="Cake"
              width={150}
              height={150}
              className="rounded-lg"
            />
            <div className="flex flex-col gap-2">
              <h2>Vanilla Cupcakes</h2>
              <p>Size 8" $3.00</p>
              <Select>
                <SelectTrigger className="w-full border-none">
                  <SelectValue placeholder="Select Quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Quantity</SelectLabel>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col text-[#74070E] text-2xl ${josefin.className}`}
        >
          <h1 className="font-medium-bold text-3xl">Total</h1>
          <line className="border-t border-[#74070E]/20 my-4 w-1/2" />
          <h3>Subtotal</h3>
          <line className="border-t border-[#74070E]/20 my-2" />
          <h3>Total</h3>
          <line className="border-t border-[#74070E]/20 my-2" />
          <Button className="w-30" variant="magnolia">
            Checkout
          </Button>
          <h3
            className="underline font-medium text-[15px]"
            onClick={() => router.push("/menu/collection")}
          >
            Continue Shopping
          </h3>
        </div>
      </div>
    </div>
  );
};

export default page;
