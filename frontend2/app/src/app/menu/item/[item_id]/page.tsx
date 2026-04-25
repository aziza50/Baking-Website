"use client";
import React, { useState, useEffect, use } from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  getMenuItemById,
  getToppingsByMenuId,
  getVariantByItemId,
} from "./actions";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { getModificationsByMenuId } from "./actions";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getIngredientsByVariantId } from "./actions";
interface MenuItem {
  id: number;
  name: string;
  image_url: string;
  description: string;
  type: string;
  category: string;
  crust_flavor: string;
}

interface MenuVariant {
  id: number;
  menu_id: number;
  shape: string;
  size: string;
  cream: string;
  filling: string;
  layers: number;
  count: number;
  quantity: number;
  feeds: number;
  price: number;
  availability: boolean;
}

const page = () => {
  //get the specific menu item from the database
  //get the menu variants for this item
  const params = useParams<{ item_id: string }>();
  const itemId = Number(params.item_id);
  const [menuItem, setMenuItem] = React.useState<MenuItem | null>(null);
  const [position, setPosition] = useState<number[]>([0, 1, 2, 3]);
  const [variants, setVariants] = useState<MenuVariant[]>([]);
  const [toppings, setToppings] = useState<{ id: number; name: string }[]>([]);
  const [modifications, setModifications] = useState<
    { id: number; name: string }[]
  >([]);
  const [ingredients, setIngredients] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedVariant, setSelectedVariant] = useState<MenuVariant | null>(
    null,
  );

  useEffect(() => {
    if (!Number.isFinite(itemId)) return;
    async function fetchVariants() {
      const response = await getVariantByItemId(itemId);
      if (response.ok) {
        setVariants(response.data);
      } else {
        console.error("Failed to fetch variants:", response.error);
      }
    }
    fetchVariants();
  }, [itemId]);

  useEffect(() => {
    if (!Number.isFinite(itemId)) return;
    async function fetchMenuItem() {
      const response = await getMenuItemById(itemId);
      if (response.ok) {
        setMenuItem(response.data);
      } else {
        console.error("Failed to fetch menu item:", response.error);
      }
    }
    fetchMenuItem();
  }, [itemId]);

  useEffect(() => {
    const fetchToppings = async () => {
      const response = await getToppingsByMenuId(itemId);
      if (response.ok) {
        setToppings(response.data);
      } else {
        console.error("Failed to fetch toppings:", response.error);
      }
    };
    fetchToppings();
  }, [itemId]);

  useEffect(() => {
    const fetchModifications = async () => {
      const response = await getModificationsByMenuId(itemId);
      if (response.ok) {
        setModifications(response.data);
      } else {
        console.error("Failed to fetch modifications:", response.error);
      }
    };
    fetchModifications();
  }, [itemId]);

  useEffect(() => {
    async function fetchIngredients() {
      if (!selectedVariant) return;
      const response = await getIngredientsByVariantId(selectedVariant.id);
      if (response.ok) {
        setIngredients(response.data);
      } else {
        console.error("Failed to fetch ingredients:", response.error);
      }
    }
    fetchIngredients();
  }, [selectedVariant]);

  useEffect(() => {
    //Grab the base variant and select that by default to get base price
    if (variants.length === 0) return;
    const baseVariant = variants[0];
    setSelectedVariant(baseVariant);
  }, [variants]);

  const handleNext = () =>
    setPosition((prevIndexes) =>
      prevIndexes.map((prevIndex) => (prevIndex + 1) % 4),
    );
  const handleBack = () =>
    setPosition((prevIndexes) =>
      prevIndexes.map((prevIndex) => (prevIndex - 1 + 4) % 4),
    );

  async function handleCart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedVariant) return;
    const quantity = e.currentTarget.quantity.value;
    if (quantity > selectedVariant?.quantity) {
      alert(
        "Sorry, we don't have that many in stock! We only have " +
          selectedVariant.quantity +
          " available.",
      );
    }
  }

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

  const priceByShape = variants.reduce(
    (acc, variant) => {
      const shapeKey = variant.shape || "Classic";
      if (!acc[shapeKey]) {
        acc[shapeKey] = [];
      }
      if (!acc[shapeKey].some((entry) => entry.size === variant.size)) {
        acc[shapeKey].push({
          size: variant.size || "Standard",
          price: variant.price,
        });
      }
      return acc;
    },
    {} as Record<string, { size: string; price: number }[]>,
  );

  return (
    <div className="flex flex-col items-center justify-center mt-60 gap-20">
      <div className="ml-20 flex gap-80 flex-row">
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
            <div className="flex flex-col">
              <div className="flex flex-row items-center ml-15 gap-30 mt-110">
                <ArrowLeft color={"#74070E"} onClick={handleBack}></ArrowLeft>
                <ArrowRight color={"#74070E"} onClick={handleNext}></ArrowRight>
              </div>
              <div
                className={`${josefin.className} mt-20 text-center max-w-sm mx-auto leading-relaxed`}
              >
                <p>{menuItem?.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-120">
          <div className="flex flex-col items-center gap-2">
            <svg viewBox="0 0 300 120" className="w-full max-w-xl h-44">
              <defs>
                <path id="circlePath" d="M 20 85 Q 150 30 280 85" fill="none" />
              </defs>
              <text
                fill="#74070E"
                fontSize="50"
                textAnchor="middle"
                className={`${dawn.className}`}
              >
                <textPath href="#circlePath" startOffset="50%">
                  {menuItem?.name}
                </textPath>
              </text>
            </svg>
            <div
              className={`${dawn.className} text-[#74070E] text-5xl font-bold text-center -mt-10`}
            >
              ${selectedVariant?.price}
            </div>
          </div>

          {/*Now Add options to select various menu item attributes/categories */}
          {menuItem && (
            <div
              key={menuItem.id}
              className="w-full max-w-lg grid grid-cols-2 gap-3 mt-2"
            >
              <div className="flex flex-col gap-3">
                <Select>
                  <SelectTrigger className="w-full border-none">
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Size</SelectLabel>
                      {variants.map((variant) => (
                        <SelectItem
                          key={variant.id}
                          value={variant.size}
                          defaultChecked={variant.id === selectedVariant?.id}
                        >
                          {variant.size}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full border-none">
                    <SelectValue placeholder="Select Topping" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Topping</SelectLabel>
                      {toppings.map((topping) => (
                        <SelectItem key={topping.id} value={topping.name}>
                          {topping.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Select>
                  <SelectTrigger className="w-full border-none">
                    <SelectValue placeholder="Select Filling" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Filling</SelectLabel>
                      {variants.map((variant) => (
                        <SelectItem key={variant.id} value={variant.filling}>
                          {variant.filling}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input className="w-full border-none" placeholder="Quantity" />
              </div>
            </div>
          )}
          <div className="w-full max-w-lg mt-1">
            <Label
              className={`${josefin.className} mt-10`}
              htmlFor="instructions"
            >
              Add Custom Decor (Additional Charges may apply):
            </Label>
            <Input
              id="instructions"
              className="w-full rounded-none border-0 border-b-2 border-black px-0 focus-visible:ring-0 focus-visible:border-black"
            />
          </div>
          <div className="w-full max-w-lg flex justify-end">
            <Button variant="magnolia" className="px-10">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`text-[#74070E] ${josefin.className} text-xl ml-0 flex  gap-20 flex-row`}
      >
        <div>
          <Accordion
            type="single"
            collapsible
            defaultValue="shipping"
            className="w-lg"
          >
            <AccordionItem value="ingredients">
              <AccordionTrigger className="text-xl">
                Ingredients
              </AccordionTrigger>
              <AccordionContent>
                {ingredients.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {ingredients.map((ingredient) => (
                      <li key={ingredient.id}>{ingredient.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No ingredients available.</p>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="allergens">
              <AccordionTrigger className="text-xl">Allergens</AccordionTrigger>
              <AccordionContent>
                Our products may contain nuts, dairy, and gluten. Please consult
                with your healthcare provider if you have any concerns.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="w-2xl rounded-3xl border mb-10 border-[#74070E]/20 bg-[#fff7f4] p-6">
          <h1 className={`${dawn.className} text-4xl text-[#74070E]`}>
            Price by Size & Shape
          </h1>
          <p className="mt-2 text-base text-[#74070E]/80">
            Choose your shape first, then pick a size. Prices shown are base
            prices before custom decor.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.entries(priceByShape).map(([shape, entries]) => (
              <div
                key={shape}
                className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#74070E]/15"
              >
                <h2 className={`${dawn.className} text-2xl text-[#74070E]`}>
                  {shape}
                </h2>
                <div className="mt-3 space-y-2">
                  {entries.map((entry) => (
                    <div
                      key={`${shape}-${entry.size}`}
                      className="flex items-center justify-between border-b border-dashed border-[#74070E]/30 pb-1"
                    >
                      <span className="capitalize">{entry.size}</span>
                      <span className="font-semibold">${entry.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
