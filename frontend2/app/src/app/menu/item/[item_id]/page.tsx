"use client";
import React, { useState, useEffect } from "react";
import { dawn, josefin } from "@/styles/fonts";
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
import { useCart } from "@/components/cart-context";

import {
  addToCart,
  getMenuItemById,
  getOrCreateCartId,
  getToppingsByMenuId,
  getVariantByItemId,
} from "./actions";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { getModificationsByMenuId } from "./actions";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getIngredientsByVariantId } from "./actions";
import { toast } from "sonner";
interface MenuItem {
  id: number;
  name: string;
  image_url: string | null;
  description: string;
  type: string;
  category: string;
  crust_flavor: string;
}

interface MenuVariant {
  id: number;
  menu_id: number;
  shape: string | null;
  size: string;
  cream: string | null;
  filling: string | null;
  layers: number | null;
  count: number | null;
  quantity: number;
  feeds: number | null;
  price: number;
  availability: boolean | null;
}

interface Modification {
  id: number;
  menu_id: number;
  categories: string;
  price: number;
}

interface Topping {
  id: number;
  menu_id: number;
  name: string;
  description: string | null;
  price: number;
}

interface Ingredient {
  id: number;
  ingredient_name: string;
}

const page = () => {
  //get the specific menu item from the database
  //get the menu variants for this item
  const params = useParams<{ item_id: string }>();
  const menu_id = Number(params.item_id);
  const [menuItem, setMenuItem] = React.useState<MenuItem | null>(null);
  const [position, setPosition] = useState<number[]>([0, 1, 2, 3]);
  const [variants, setVariants] = useState<MenuVariant[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [modifications, setModifications] = useState<Modification[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedVariant, setSelectedVariant] = useState<MenuVariant | null>(
    null,
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [selectedFilling, setSelectedFilling] = useState<string | null>(null);
  const [selectedToppingId, setSelectedToppingId] = useState<number | null>(
    null,
  );
  const [selectedModificationId, setSelectedModificationId] = useState<
    number | null
  >(null);
  const [quantity, setQuantity] = useState<number>(1);
  const uniqueSizes = Array.from(
    new Set(variants.map((variant) => variant.size)),
  );
  const uniqueFillings = Array.from(
    new Set(variants.map((variant) => variant.filling)),
  );
  const uniqueShapes = Array.from(
    new Set(variants.map((variant) => variant.shape)),
  );
  const { updateCart } = useCart();
  async function handleAddToCart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedVariant) return;

    const cartId = await getOrCreateCartId();
    if (!cartId) {
      toast.error("Failed to create cart. Please try again.");
      return;
    }
    const response = await addToCart(
      cartId,
      menu_id,
      selectedVariant.id,
      selectedToppingId,
      selectedModificationId,
      quantity,
    );
    if (response.ok) {
      toast.success("Item added to cart!");
      //need to update such that current cart quantity + new quantity
      updateCart(quantity);
    } else {
      toast.error("Failed to add item to cart. Please try again.");
    }
  }

  function getModifNameById(modifId: number | null): string {
    if (!modifId) return "";
    const modif = modifications.find((m) => m.id === modifId);
    return modif ? modif.categories : "";
  }

  useEffect(() => {
    if (!Number.isFinite(menu_id)) return;
    async function fetchVariants() {
      const response = await getVariantByItemId(menu_id);
      if (response.ok) {
        setVariants(response.data);
      } else {
        console.error("Failed to fetch variants:", response.error);
      }
    }
    fetchVariants();
  }, [menu_id]);

  useEffect(() => {
    if (!Number.isFinite(menu_id)) return;
    async function fetchMenuItem() {
      const response = await getMenuItemById(menu_id);
      if (response.ok) {
        setMenuItem(response.data);
      } else {
        console.error("Failed to fetch menu item:", response.error);
      }
    }
    fetchMenuItem();
  }, [menu_id]);

  useEffect(() => {
    const fetchToppings = async () => {
      const response = await getToppingsByMenuId(menu_id);
      if (response.ok) {
        setToppings(response.data);
      } else {
        console.error("Failed to fetch toppings:", response.error);
      }
    };
    fetchToppings();
  }, [menu_id]);

  useEffect(() => {
    const fetchModifications = async () => {
      const response = await getModificationsByMenuId(menu_id);
      if (response.ok) {
        setModifications(response.data);
      } else {
        console.error("Failed to fetch modifications:", response.error);
      }
    };
    fetchModifications();
  }, [menu_id]);

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
    setSelectedSize(baseVariant.size);
    setSelectedShape(baseVariant.shape);
    setSelectedFilling(baseVariant.filling);
    setTotalPrice(Number(baseVariant.price));
  }, [variants]);

  useEffect(() => {
    if (variants.length === 0) return;

    const matchingVariant = variants.find((variant) => {
      const sizeMatches = selectedSize ? variant.size === selectedSize : true;
      const shapeMatches = selectedShape
        ? variant.shape === selectedShape
        : true;
      const fillingMatches = selectedFilling
        ? variant.filling === selectedFilling
        : true;

      if (!(sizeMatches && shapeMatches && fillingMatches)) {
        toast.error(
          "Selected combination is unavailable. Please choose a different option.",
        );
      }
      return sizeMatches && shapeMatches && fillingMatches;
    });

    setSelectedVariant(matchingVariant ?? null);
  }, [selectedSize, selectedShape, selectedFilling, variants]);

  useEffect(() => {
    const variantPrice = selectedVariant ? Number(selectedVariant.price) : 0;
    const toppingPrice = selectedToppingId
      ? Number(
          toppings.find((topping) => topping.id === selectedToppingId)?.price ??
            0,
        )
      : 0;
    const modificationPrice = selectedModificationId
      ? Number(
          modifications.find(
            (modification) => modification.id === selectedModificationId,
          )?.price ?? 0,
        )
      : 0;

    setTotalPrice((variantPrice + toppingPrice + modificationPrice) * quantity);
  }, [
    selectedVariant,
    selectedToppingId,
    selectedModificationId,
    quantity,
    toppings,
    modifications,
  ]);

  //Image logic
  const handleNext = () =>
    setPosition((prevIndexes) =>
      prevIndexes.map((prevIndex) => (prevIndex + 1) % 4),
    );
  const handleBack = () =>
    setPosition((prevIndexes) =>
      prevIndexes.map((prevIndex) => (prevIndex - 1 + 4) % 4),
    );

  const baseURL = process.env.NEXT_PUBLIC_S3_BASE_URL;
  const signCakeImages = [
    menuItem?.image_url || "cake.png",
    menuItem?.image_url || "cake.png",
    menuItem?.image_url || "cake.png",
    menuItem?.image_url || "cake.png",
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

  function handleToppingChange(toppingId: number | null) {
    setSelectedToppingId(toppingId);
  }

  function handleModificationChange(modificationId: number | null) {
    setSelectedModificationId(modificationId);
  }

  function handleQuantityChange(quantity_val: number) {
    setQuantity(quantity_val);
  }

  return (
    <div className="flex flex-col mb-20 items-center justify-center mt-60 ">
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
            <div className="flex flex-col">
              <div className="flex flex-row items-center ml-15 gap-30 mt-110">
                <ArrowLeft color={"#74070E"} onClick={handleBack}></ArrowLeft>
                <ArrowRight color={"#74070E"} onClick={handleNext}></ArrowRight>
              </div>
              <div
                className={`${josefin.className} mt-10 text-center max-w-sm mx-auto leading-relaxed`}
              >
                <p>
                  {menuItem?.description
                    ? menuItem.description
                    : "No description available."}
                </p>
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
                fontSize="30"
                textAnchor="middle"
                className={`${dawn.className}`}
              >
                <textPath href="#circlePath" startOffset="50%">
                  {menuItem?.name}
                </textPath>
              </text>
            </svg>
            <div className="flex flex-row gap-10">
              <div
                className={`${dawn.className} text-[#74070E] text-5xl font-bold text-center -mt-10`}
              >
                ${totalPrice.toFixed(2)}
              </div>
              {menuItem?.category === "party_item" && (
                <div
                  className={`${dawn.className}  text-[#74070E] text-5xl font-bold text-center -mt-10 `}
                >
                  Count:{" "}
                  {selectedVariant?.count ? selectedVariant.count : "N/A"}
                </div>
              )}
            </div>
          </div>

          {/*Now Add options to select various menu item attributes/categories */}
          {menuItem && variants && (
            <form onSubmit={handleAddToCart}>
              <div
                key={menuItem.id}
                className="w-lg grid grid-cols-2 gap-3 mt-2"
              >
                <div className="flex flex-col gap-3">
                  <Select
                    value={selectedSize ?? ""}
                    onValueChange={setSelectedSize}
                  >
                    <SelectTrigger className="w-full border-none">
                      <SelectValue placeholder="Select Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Size</SelectLabel>
                        {uniqueSizes.map((size) => (
                          //check if unique size for the dropdown - don't want multiple
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select
                    value={
                      selectedToppingId ? String(selectedToppingId) : "none"
                    }
                    onValueChange={(value) =>
                      handleToppingChange(
                        value === "none" ? null : Number(value),
                      )
                    }
                  >
                    <SelectTrigger className="w-full border-none">
                      <SelectValue placeholder="Select Topping" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Topping</SelectLabel>
                        <SelectItem value="none">No topping</SelectItem>
                        {toppings.map((topping) => (
                          <SelectItem
                            key={topping.id}
                            value={String(topping.id)}
                          >
                            {topping.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div>
                    <Select
                      value={
                        selectedModificationId
                          ? String(selectedModificationId)
                          : "none"
                      }
                      onValueChange={(value) =>
                        handleModificationChange(
                          value === "none" ? null : Number(value),
                        )
                      }
                    >
                      <SelectTrigger className="w-full border-none">
                        <SelectValue placeholder="Select Modification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Modification</SelectLabel>
                          <SelectItem value="none">No modification</SelectItem>
                          {modifications.map((m) => (
                            <SelectItem key={m.id} value={String(m.id)}>
                              {m.categories}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Select
                    value={selectedFilling ?? ""}
                    onValueChange={setSelectedFilling}
                  >
                    <SelectTrigger className="w-full border-none">
                      <SelectValue placeholder="Select Filling" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Filling</SelectLabel>
                        {uniqueFillings.map((filling) => (
                          <SelectItem
                            key={filling}
                            value={filling?.toString() || "None"}
                          >
                            {filling}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {selectedVariant?.count && (
                    <Select
                      value={String(quantity)}
                      onValueChange={(v) => handleQuantityChange(Number(v))}
                    >
                      <SelectTrigger className="w-full border-none">
                        <SelectValue placeholder="Select Quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Quantity</SelectLabel>
                          {Array.from(
                            { length: selectedVariant.quantity },
                            (_, i) => i + 1,
                          ).map((quantity) => (
                            <SelectItem
                              key={quantity}
                              value={quantity.toString()}
                            >
                              {quantity}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  <Select
                    value={selectedShape ?? ""}
                    onValueChange={setSelectedShape}
                  >
                    <SelectTrigger className="w-full border-none">
                      <SelectValue placeholder="Select Shape" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Shape</SelectLabel>
                        {uniqueShapes.map((shapes) => (
                          <SelectItem
                            key={shapes}
                            value={shapes?.toString() || ""}
                          >
                            {shapes}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-10">
                <div className="w-full max-w-lg mt-1">
                  <Label
                    className={`${josefin.className} mt-10`}
                    htmlFor="instructions"
                  >
                    Add Custom Inscription (No additional charges):
                  </Label>
                  <Input
                    id="instructions"
                    disabled={
                      getModifNameById(selectedModificationId) !==
                      "Add an inscription"
                    }
                    className="w-full rounded-none border-0 border-b-2 border-black px-0 focus-visible:ring-0 focus-visible:border-black"
                  />
                </div>
                <div className="w-full max-w-lg flex justify-end">
                  <Button
                    variant="magnolia"
                    type="submit"
                    className="px-10"
                    disabled={!selectedVariant}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <div
        className={`text-[#74070E] ${josefin.className} text-xl ml-0 flex mt-30  gap-20 flex-row`}
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
                      <li key={ingredient.id}>{ingredient.ingredient_name}</li>
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
