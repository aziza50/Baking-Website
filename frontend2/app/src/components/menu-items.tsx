"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { dawn, josefin } from "../styles/fonts";
import { NextResponse } from "next/server";
import { desc, i } from "framer-motion/client";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  type: string;
  category: string;
  crust_flavor: string;
}

interface MenuVariant {
  id: number;
  menu_id: number;
  price: number;
  availability: boolean;
}

export default function MenuItems() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [variants, setVariants] = useState<MenuVariant[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const res = await fetch("/api/menu"); 

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.details || "Failed to fetch");
        }

        const data = await res.json();
        setItems(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Client fetch error:", err);
      }
    };

    getMenu();
  }, []);

  useEffect(() => {
    const getVariants = async () => {
      try {
        const res = await fetch("/api/variant"); 

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.details || "Failed to fetch");
        }

        const data = await res.json();
        setVariants(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Client fetch error:", err);
      }
    };

    getVariants();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (items.length === 0) return <div>Loading menu...</div>;
  if (variants.length === 0) return <div>Loading variants...</div>;

  return (
  <div className="bg-[#74070E] text-white py-16 px-4 min-h-screen">
    {/*Display menu variant information just to see for testing purposes*/}
    {/* variants.map((variant) => (
      <div key={variant.id}>
        {items.some(item => item.id === variant.menu_id) && (
          <p>{items.find(item => item.id === variant.menu_id)?.name} - {variant.availability ? "Available" : "Sold Out"}</p>
        )}
      </div>
    ))*/}

    
    <h1 className={`${dawn.className} text-center text-5xl mb-12`}>
      Signature Cakes
    </h1>

    {/*As long as one menu variant is available for the menu item, display it along with its price */}
    {/*Else, if no menu variants exist show it as COMING SOON, or if all menu variants are unavailable show it as SOLD OUT */}
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
      {items
      .filter((item) => item.type === "signature cake" && variants.some(v => v.menu_id === item.id) && variants.filter(v => v.menu_id === item.id).some(v => v.availability))
      .map((item, index) => {

      const itemPrices = variants
      .filter((v) => v.menu_id === item.id)
      .map((v) => v.price);

      const minPrice = Math.min(...itemPrices);
      const maxPrice = Math.max(...itemPrices);

      const priceDisplay = minPrice === maxPrice 
        ? `$${minPrice}` 
        : `$${minPrice} - $${maxPrice}`;
        
      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center text-center"
        >
          <div className="bg-white p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px]">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/cake.png"
                alt={item.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <h3 className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}>
            {item.name}
          </h3>
          
          <p className={`${josefin.className} text-lg leading-relaxed max-w-[250px] font-bold mb-2`}>
            {priceDisplay}
          </p>

          <p className={`${josefin.className} text-sm leading-relaxed max-w-[250px] opacity-90`}>
            {item.description}
          </p>
        </motion.div>
      );
      })}

      {items
      .filter((item) => item.type === "signature cake" && !variants.some(v => v.menu_id === item.id) || variants.filter(v => v.menu_id === item.id).every(v => !v.availability))
      .map((item, index) => {

      // If no variants exist for this menu item, show it as COMING SOON. If variants exist but all have availability false, show it as SOLD OUT. In both cases, grey out the item and don't show a price.
      const status = !variants.some(v => v.menu_id === item.id) ? "COMING SOON" : "SOLD OUT";
        
      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center text-center"
        >
          <div className="bg-gray-200 p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px] opacity-50">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/cake.png"
                alt={item.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <h3 className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}>
            {item.name}
          </h3>
          
          <p className={`${josefin.className} text-lg leading-relaxed max-w-[250px] mb-2`}>
            {status}
          </p>

          <p className={`${josefin.className} text-sm leading-relaxed max-w-[250px] opacity-90`}>
            {item.description}
          </p>
        </motion.div>
      );
      })}
    </div>

    <h1 className={`${dawn.className} text-center text-5xl mb-12 mt-20`}>
      Specialty Cakes
    </h1>

    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
      {items
      .filter((item) => item.type === "specialty cake" && variants.some(v => v.menu_id === item.id) && variants.filter(v => v.menu_id === item.id).some(v => v.availability))
      .map((item, index) => {

      const itemPrices = variants
      .filter((v) => v.menu_id === item.id)
      .map((v) => v.price);

      const minPrice = Math.min(...itemPrices);
      const maxPrice = Math.max(...itemPrices);

      const priceDisplay = minPrice === maxPrice 
        ? `$${minPrice}` 
        : `$${minPrice} - $${maxPrice}`;
        
      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center text-center"
        >
          <div className="bg-white p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px]">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/cake.png"
                alt={item.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <h3 className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}>
            {item.name}
          </h3>
          
          <p className={`${josefin.className} text-lg leading-relaxed max-w-[250px] font-bold mb-2`}>
            {priceDisplay}
          </p>

          <p className={`${josefin.className} text-sm leading-relaxed max-w-[250px] opacity-90`}>
            {item.description}
          </p>
        </motion.div>
      );
      })}

      {/*If menu variant doesn't exist for a menu item, grey it out and show it as COMING SOON with no price*/}
      {items
      .filter((item) => item.type === "specialty cake" && (!variants.some(v => v.menu_id === item.id) || variants.filter(v => v.menu_id === item.id).every(v => !v.availability)))
      .map((item, index) => {

      const status = !variants.some(v => v.menu_id === item.id) ? "COMING SOON" : "SOLD OUT";
        
      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center text-center"
        >
          <div className="bg-gray-200 p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px] opacity-50">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/cake.png"
                alt={item.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <h3 className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}>
            {item.name}
          </h3>
          
          <p className={`${josefin.className} text-lg leading-relaxed max-w-[250px] mb-2`}>
            {status}
          </p>

          <p className={`${josefin.className} text-sm leading-relaxed max-w-[250px] opacity-90`}>
            {item.description}
          </p>
        </motion.div>
      );
      })}
    </div>

    <h1 className={`${dawn.className} text-center text-5xl mb-12 mt-20`}>
      Parties & Gatherings
    </h1>

    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
      {items
      .filter((item) => item.category === "party_item" && variants.some(v => v.menu_id === item.id) && variants.filter(v => v.menu_id === item.id).some(v => v.availability))
      .map((item, index) => {

      const itemPrices = variants
      .filter((v) => v.menu_id === item.id)
      .map((v) => v.price);

      const minPrice = Math.min(...itemPrices);
      const maxPrice = Math.max(...itemPrices);

      const priceDisplay = minPrice === maxPrice 
        ? `$${minPrice}` 
        : `$${minPrice} - $${maxPrice}`;
        
      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center text-center"
        >
          <div className="bg-white p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px]">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/cake.png"
                alt={item.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <h3 className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}>
            {item.name}
          </h3>
          
          <p className={`${josefin.className} text-lg leading-relaxed max-w-[250px] font-bold mb-2`}>
            {priceDisplay}
          </p>

          <p className={`${josefin.className} text-sm leading-relaxed max-w-[250px] opacity-90`}>
            {item.description}
          </p>
        </motion.div>
      );
      })}

      {/*If menu variant doesn't exist for a menu item, grey it out and show it as COMING SOON with no price*/}
      {items
      .filter((item) => item.category === "party_item" && (!variants.some(v => v.menu_id === item.id) || variants.filter(v => v.menu_id === item.id).every(v => !v.availability)))
      .map((item, index) => {
      
      const status = !variants.some(v => v.menu_id === item.id) ? "COMING SOON" : "SOLD OUT";

      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center text-center"
        >
          <div className="bg-gray-200 p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px] opacity-50">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/cake.png"
                alt={item.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <h3 className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}>
            {item.name}
          </h3>
          
          <p className={`${josefin.className} text-lg leading-relaxed max-w-[250px] mb-2`}>
            {status}
          </p>

          <p className={`${josefin.className} text-sm leading-relaxed max-w-[250px] opacity-90`}>
            {item.description}
          </p>
        </motion.div>
      );
      })}
    </div>

  </div>
);

}