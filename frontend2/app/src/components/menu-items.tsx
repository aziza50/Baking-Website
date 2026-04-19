"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { dawn, josefin } from "../styles/fonts";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  type: string;
  category: string;
  crust_flavor: string;
}

export default function MenuItems() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
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

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (items.length === 0) return <div>Loading menu...</div>;

  return (
    <div className="bg-[#74070E] text-white py-16 px-4 min-h-screen">
      <h1 className={`${dawn.className} text-center text-5xl mb-12`}>
        Signature Cakes
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="cursor-pointer bg-white p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px]">
              <div
                onClick={() => {
                  router.push(`/menu/item/${item.id}`);
                }}
                className="relative aspect-[4/5] w-full"
              >
                <Image
                  src="/images/cake.png"
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            <h3
              className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-3`}
            >
              {item.name}
            </h3>

            <p
              className={`${josefin.className} text-sm leading-relaxed max-w-[250px] opacity-90`}
            >
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
