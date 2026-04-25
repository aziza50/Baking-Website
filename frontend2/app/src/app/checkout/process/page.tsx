"use client";
import { josefin } from "@/styles/fonts";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CheckoutPage from "@/components/checkout-page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "radix-ui";
import { Input } from "@/components/ui/input";
const page = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  async function handleForward() {
    setStep((prev) => (prev === 1 ? 2 : prev === 2 ? 3 : prev));
  }
  async function handleBack() {
    setStep((prev) => (prev === 2 ? 1 : prev === 3 ? 2 : prev));
  }
  return (
    <div className="min-h-screen gap-10 mb-20 flex-col flex justify-center">
      <div className="justify-center flex flex-row text-[#74070E] text-2xl">
        <div className={"font-medium"}>Shopping Cart</div>
        <svg
          width="83"
          height="15"
          viewBox="0 0 83 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-10 mt-2"
        >
          <path
            opacity={step == 1 ? "0.4" : "1"}
            d="M82.7071 8.07106C83.0976 7.68054 83.0976 7.04737 82.7071 6.65685L76.3431 0.292885C75.9526 -0.0976396 75.3195 -0.0976396 74.9289 0.292885C74.5384 0.683409 74.5384 1.31657 74.9289 1.7071L80.5858 7.36395L74.9289 13.0208C74.5384 13.4113 74.5384 14.0445 74.9289 14.435C75.3195 14.8255 75.9526 14.8255 76.3431 14.435L82.7071 8.07106ZM0 7.36395V8.36395H82V7.36395V6.36395H0V7.36395Z"
            fill="#74070E"
          />
        </svg>

        <div className={step == 2 || step == 3 ? "font-medium" : "opacity-40"}>
          Contact
        </div>
        <svg
          width="83"
          height="15"
          viewBox="0 0 83 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-10 mt-2"
        >
          <path
            opacity={step == 2 || step == 1 ? "0.4" : "1"}
            d="M82.7071 8.07106C83.0976 7.68054 83.0976 7.04737 82.7071 6.65685L76.3431 0.292885C75.9526 -0.0976396 75.3195 -0.0976396 74.9289 0.292885C74.5384 0.683409 74.5384 1.31657 74.9289 1.7071L80.5858 7.36395L74.9289 13.0208C74.5384 13.4113 74.5384 14.0445 74.9289 14.435C75.3195 14.8255 75.9526 14.8255 76.3431 14.435L82.7071 8.07106ZM0 7.36395V8.36395H82V7.36395V6.36395H0V7.36395Z"
            fill="#74070E"
          />
        </svg>

        <div className={step == 3 ? "font-medium" : "opacity-40"}>Payment</div>
      </div>

      <div className="w-full max-w-6xl mt-5 px-6 mx-auto flex flex-row items-start justify-between gap-10">
        <div
          className={`w-full max-w-3xl flex flex-col text-[#74070E] text-2xl ${josefin.className}`}
        >
          <h1 className="font-medium-bold text-3xl">
            {step == 1 ? "Shopping Cart" : step == 2 ? "Contact" : "Payment"}
          </h1>
          <div className="h-px w-full bg-[#74070E] my-4" />
          {step == 1 && (
            <div className="flex flex-row items-start gap-6">
              <Image
                src="https://folioimagess.s3.us-east-1.amazonaws.com/public/good13.jpg"
                alt="Cake"
                width={180}
                height={180}
                className="rounded-lg"
              />
              <div className="flex text-[15px] text-[#74070E] flex-col items-start gap-5">
                <div className="flex flex-row gap-70 items-center">
                  <h2 className="text-[20px] font-medium">Vanilla Cupcakes</h2>
                  <h3 className="text-[15px] underline ">Remove</h3>
                </div>
                <div className="flex flex-row gap-8 items-center">
                  <p>Size 8"</p>
                  <p>$3.00</p>
                </div>

                <Select>
                  <SelectTrigger className={`w-30 border-none`}>
                    <SelectValue
                      className={`text-[#74070E] ${josefin.className}`}
                      placeholder="Quantity 1"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Quantity</SelectLabel>
                      <SelectItem value="1">Quantity 1</SelectItem>
                      <SelectItem value="2">Quantity 2</SelectItem>
                      <SelectItem value="3">Quantity 3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          {step == 2 && (
            <div className="flex flex-col">
              <div className="flex flex-row mt-7 gap-15 w-full">
                <div className="w-100 flex flex-col gap-5 text-[15px]">
                  <label htmlFor="name">First Name</label>
                  <input
                    type="text"
                    id="name"
                    className="rounded-none border-0 border-b border-[#74070E] px-0"
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="rounded-none border-0 border-b border-[#74070E] px-0"
                  />
                </div>
                <div className="w-100 flex flex-col gap-5 text-[15px]">
                  <label htmlFor="name">Last Name</label>
                  <input
                    type="text"
                    id="name"
                    className="rounded-none border-0 border-b border-[#74070E] px-0"
                  />
                  <label htmlFor="email">Phone</label>
                  <input
                    type="email"
                    id="email"
                    className="rounded-none border-0 border-b border-[#74070E] px-0 "
                  />
                </div>
              </div>
              <div className="flex flex-row gap-80 mt-10">
                <h3
                  className="text-[15px] font-medium underline"
                  onClick={handleBack}
                >
                  Back to Shopping Cart
                </h3>
                <Button
                  onClick={handleForward}
                  variant="magnolia"
                  className="w-30 mr-0"
                >
                  Proceed
                </Button>
              </div>
            </div>
          )}

          {step == 3 && <CheckoutPage amount={150} />}
        </div>
        <div
          className={`w-full max-w-sm flex flex-col text-[#74070E] ${josefin.className}`}
        >
          <h1 className="font-medium text-3xl">
            {step == 1 ? "Total" : "Your Order"}
          </h1>
          <div
            className="h-px w-full bg-[#74070E]
           my-4"
          />
          <div className="flex flex-row gap-70">
            <h3>Subtotal</h3>
            <h3>$150</h3>
          </div>
          <div className="h-px w-full bg-[#74070E] my-4" />
          <div className="flex flex-row gap-75">
            <h3>Total</h3>
            <h3>$150</h3>
          </div>
          <div className="h-px w-full bg-[#74070E] my-4" />
          <div className="flex flex-row gap-35">
            <h3
              className="cursor-pointer underline font-medium text-[15px]"
              onClick={() => router.push("/menu/collection")}
            >
              Continue Shopping
            </h3>

            <Button
              onClick={handleForward}
              className="cursor-pointer w-30"
              variant="magnolia"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
