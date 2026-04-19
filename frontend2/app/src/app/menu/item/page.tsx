"use client";
import React, { useState } from "react";
import { crimson, dawn, josefin } from "@/styles/fonts";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MenuItem {
  id: number;
  name: string;
  image_url: string;
  description: string;
  type: string;
}

const page = () => {
  //get the specific menu item from the database
  const [menuItem, setMenuItem] = React.useState<MenuItem | null>(null);
  const [position, setPosition] = useState<number[]>([0, 1, 2, 3]);

  const handleNext = () =>
    setPosition((prevIndexes) =>
      prevIndexes.map((prevIndex) => (prevIndex + 1) % 4),
    );
  const handleBack = () =>
    setPosition((prevIndexes) =>
      prevIndexes.map((prevIndex) => (prevIndex - 1 + 4) % 4),
    );

  const baseURL = "https://folioimagess.s3.us-east-1.amazonaws.com/public/";
  const signCakeImages = [
    "good2.jpg",
    "good28.jpg",
    "good31.jpg",
    "good16.jpg",
  ];
  const numbCakeImages = [
    "good3.jpg",
    "good11.jpg",
    "good32.jpg",
    "good30.jpg",
  ];

  const imagePositions = {
    left: { x: "-60%", y: "20%", rotate: -30, scale: 0.5, zIndex: 2 },
    center: { x: "0%", scale: 1, zIndex: 5 },
    right: { x: "60%", y: "20%", rotate: 30, scale: 0.5, zIndex: 2 },
    back: { x: "0%", scale: 1, zIndex: 0, opacity: 0 },
  };

  function getPositionStyle(pos: number) {
    if (pos === position[0]) return imagePositions.left;
    if (pos === position[1]) return imagePositions.center;
    if (pos === position[2]) return imagePositions.right;
    return imagePositions.back;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-60 gap-20">
      <div className="ml-20 flex gap-70 flex-row">
        <div className="flex flex-col">
          <div>
            {signCakeImages.map((image: string, index: number) => (
              <motion.div
                key={index}
                style={{ position: "absolute" }}
                animate={getPositionStyle(index)}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Image
                  src={baseURL + image}
                  alt={`Cake ${index + 1}`}
                  width={300}
                  height={300}
                  className="rounded-2xl object-cover"
                />
              </motion.div>
            ))}
          </div>
          <div className="flex flex-row items-center ml-15 gap-30 mt-110">
            <ArrowLeft color={"#74070E"} onClick={handleBack}></ArrowLeft>
            <ArrowRight color={"#74070E"} onClick={handleNext}></ArrowRight>
          </div>
          <div className={`${josefin.className} mt-20 text-xl text-center `}>
            <p>description blah blah blah</p>
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <svg viewBox="0 0 300 300" className="w-150 h-150">
              <defs>
                <path
                  id="circlePath"
                  d="M 150, 150 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
                  fill="none"
                />
              </defs>
              <text
                fill="#74070E"
                fontSize="35"
                className={`${dawn.className}`}
              >
                <textPath href="#circlePath" startOffset="9%">
                  Vanilla Heart Cake
                  <textPath href="#circlePath" startOffset="50%"></textPath>
                </textPath>
              </text>
            </svg>
          </div>
          {/*Now Add options to select various menu item attributes/categories */}
          {menuItem && (
            <div key={menuItem.id}>
              <h2>{menuItem.name}</h2>
              <p>{menuItem.description}</p>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Size</SelectLabel>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Topping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Topping</SelectLabel>
                    <SelectItem value="cherry">Cherry</SelectItem>
                    <SelectItem value="strawberry">Strawberry</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Topping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Flavor</SelectLabel>
                    <SelectItem value="cherry">Cherry</SelectItem>
                    <SelectItem value="strawberry">Strawberry</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Topping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Quantity</SelectLabel>
                    <SelectItem value="cherry">Cherry</SelectItem>
                    <SelectItem value="strawberry">Strawberry</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      <div className="ml-40 mt-80 flex  gap-50 flex-row">
        <h1>Price Based on Size: </h1>
        <svg
          width="700"
          height="300"
          viewBox="0 0 596 209"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="59" cy="155" rx="59" ry="54" fill="#74070E" />
          <ellipse cx="252.5" cy="130" rx="84.5" ry="79" fill="#74070E" />
          <circle cx="491.5" cy="104.5" r="104.5" fill="#74070E" />
        </svg>
      </div>
    </div>
  );
};

export default page;
