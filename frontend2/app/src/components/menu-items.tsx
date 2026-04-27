"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { dawn, josefin } from "../styles/fonts";
import { useRouter } from "next/navigation";
import { getCollection } from "@/app/menu/collection/actions";
import { getVariant } from "@/app/menu/item/[item_id]/actions";
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  price: number;
  availability: boolean;
}

export default function MenuItems() {
  const baseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  const [items, setItems] = useState<MenuItem[]>([]);
  const [variants, setVariants] = useState<MenuVariant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  useEffect(() => {
    const getMenu = async () => {
      const data = await getCollection();
      if (data.ok) {
        setItems(data.data);
      } else {
        setError(data.error || "Failed to fetch menu items");
      }
    };
    getMenu();
  }, []);

  useEffect(() => {
    const getVariants = async () => {
      try {
        const res = await getVariant();

        if (res.ok) {
          setVariants(res.data);
        } else {
          setError(res.error || "Failed to fetch menu variants");
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Client fetch error:", err);
      }
    };

    getVariants();
  }, []);

  const searchResults = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

<<<<<<< HEAD
      <h1 className={`${dawn.className} text-center text-5xl mb-12`}>
        Signature Cakes
      </h1>

      {/*As long as one menu variant is available for the menu item, display it along with its price */}
      {/*Else, if no menu variants exist show it as COMING SOON, or if all menu variants are unavailable show it as SOLD OUT */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
        {items
          .filter(
            (item) =>
              item.type === "signature cake" &&
              variants.some((v) => v.menu_id === item.id) &&
              variants
                .filter((v) => v.menu_id === item.id)
                .some((v) => v.availability),
          )
          .map((item, index) => {
            const itemPrices = variants
              .filter((v) => v.menu_id === item.id)
              .map((v) => v.price);

            const minPrice = Math.min(...itemPrices);
            const maxPrice = Math.max(...itemPrices);

            const priceDisplay =
              minPrice === maxPrice
                ? `$${minPrice}`
                : `$${minPrice} - $${maxPrice}`;

            return (
              <motion.div
                onClick={() => {
                  router.push(`/menu/item/${item.id}`);
                }}
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="cursor-pointer bg-white p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px]">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={baseUrl + item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>

                <h3
                  className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}
                >
                  {item.name}
                </h3>

                <p
                  className={`${josefin.className} text-lg leading-relaxed max-w-[250px] font-bold mb-2`}
                >
                  {priceDisplay}
                </p>
=======
      <div className="max-w-2xl mx-auto mb-16 space-y-3">
        <Label htmlFor="search-input" className="text-white opacity-80 text-lg">
          Search Menu
        </Label>
        <div className="relative">
          <Search className="-translate-y-1/2 absolute top-1/2 left-4 h-6 w-6 text-muted-foreground" />
          <Input 
            className="bg-white text-black pl-12 h-14 text-xl rounded-2xl"
            id="search-input" 
            placeholder="Search for a cake..." 
            type="search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
>>>>>>> origin/updated_menu


      {searchQuery.trim().length > 0 ? (
        /* SEARCH RESULTS VIEW: No categories, just the grid */
        <div className="max-w-6xl mx-auto">
          <h2 className={`${dawn.className} text-center text-4xl mb-12`}>
            Found {searchResults.length} results for "{searchQuery}"
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
            {searchResults.map((item, index) => (
               <MenuItemCard 
                key={item.id} 
                item={item} 
                variants={variants} 
                index={index} 
                router={router} 
              />
            ))}
          </div>
          {searchResults.length === 0 && (
            <p className="text-center opacity-60">No items match your search.</p>
          )}
        </div>
      ) : (

      <>
        <h1 className={`${dawn.className} text-center text-5xl mb-12`}>
          Signature Cakes
        </h1>

        {/*As long as one menu variant is available for the menu item, display it along with its price */}
        {/*Else, if no menu variants exist show it as COMING SOON, or if all menu variants are unavailable show it as SOLD OUT */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {items
            .filter(
              (item) =>
                item.type === "signature cake" &&
                variants.some((v) => v.menu_id === item.id) &&
                variants
                  .filter((v) => v.menu_id === item.id)
                  .some((v) => v.availability),
            )
            .map((item, index) => {
              const itemPrices = variants
                .filter((v) => v.menu_id === item.id)
<<<<<<< HEAD
                .every((v) => !v.availability),
          )
          .map((item, index) => {
            // If no variants exist for this menu item, show it as COMING SOON. If variants exist but all have availability false, show it as SOLD OUT. In both cases, grey out the item and don't show a price.
            const status = !variants.some((v) => v.menu_id === item.id)
              ? "COMING SOON"
              : "SOLD OUT";

            return (
              <motion.div
                onClick={() => {
                  router.push(`/menu/item/${item.id}`);
                }}
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-gray-200 p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px] opacity-50">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={baseUrl + item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>

                <h3
                  className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}
                >
                  {item.name}
                </h3>

                <p
                  className={`${josefin.className} text-lg leading-relaxed max-w-[250px] mb-2`}
                >
                  {status}
                </p>

                <p
                  className={`${josefin.className} text-sm leading-relaxed max-w-[250px] opacity-90`}
                >
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
          .filter(
            (item) =>
              item.type === "specialty cake" &&
              variants.some((v) => v.menu_id === item.id) &&
              variants
                .filter((v) => v.menu_id === item.id)
                .some((v) => v.availability),
          )
          .map((item, index) => {
            const itemPrices = variants
              .filter((v) => v.menu_id === item.id)
              .map((v) => v.price);

            const minPrice = Math.min(...itemPrices);
            const maxPrice = Math.max(...itemPrices);

            const priceDisplay =
              minPrice === maxPrice
                ? `$${minPrice}`
                : `$${minPrice} - $${maxPrice}`;

            return (
              <motion.div
                onClick={() => {
                  router.push(`/menu/item/${item.id}`);
                }}
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-white p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px]">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={baseUrl + item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
=======
                .map((v) => v.price);

              const minPrice = Math.min(...itemPrices);
              const maxPrice = Math.max(...itemPrices);

              const priceDisplay =
                minPrice === maxPrice
                  ? `$${minPrice}`
                  : `$${minPrice} - $${maxPrice}`;

              return (
                <motion.div
                  onClick={() => {
                    router.push(`/menu/item/${item.id}`);
                  }}
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="cursor-pointer bg-white p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px]">
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src="/images/cake.png"
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
>>>>>>> origin/updated_menu
                  </div>

                  <h3
                    className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}
                  >
                    {item.name}
                  </h3>

                  <p
                    className={`${josefin.className} text-lg leading-relaxed max-w-[250px] font-bold mb-2`}
                  >
                    {priceDisplay}
                  </p>

                  <p
                    className={`${josefin.className} text-sm leading-relaxed max-w-[250px] opacity-90`}
                  >
                    {item.description}
                  </p>
                </motion.div>
              );
          })}

          {items
            .filter(
              (item) =>
                (item.type === "signature cake" &&
                  !variants.some((v) => v.menu_id === item.id)) ||
                variants
                  .filter((v) => v.menu_id === item.id)
<<<<<<< HEAD
                  .every((v) => !v.availability)),
          )
          .map((item, index) => {
            const status = !variants.some((v) => v.menu_id === item.id)
              ? "COMING SOON"
              : "SOLD OUT";

            return (
              <motion.div
                onClick={() => {
                  router.push(`/menu/item/${item.id}`);
                }}
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-gray-200 p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px] opacity-50">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={baseUrl + item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>

                <h3
                  className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}
                >
                  {item.name}
                </h3>

                <p
                  className={`${josefin.className} text-lg leading-relaxed max-w-[250px] mb-2`}
=======
                  .every((v) => !v.availability),
            )
            .map((item, index) => {
              // If no variants exist for this menu item, show it as COMING SOON. If variants exist but all have availability false, show it as SOLD OUT. In both cases, grey out the item and don't show a price.
              const status = !variants.some((v) => v.menu_id === item.id)
                ? "COMING SOON"
                : "SOLD OUT";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
>>>>>>> origin/updated_menu
                >
                  <div className="bg-gray-200 p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px] opacity-50">
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src="/images/cake.png"
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg grayscale"
                      />
                    </div>
                  </div>

                  <h3
                    className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}
                  >
                    {item.name}
                  </h3>

                  <p
                    className={`${josefin.className} text-lg leading-relaxed max-w-[250px] mb-2`}
                  >
                    {status}
                  </p>

                  <p
                    className={`${josefin.className} text-sm leading-relaxed max-w-[250px] opacity-90`}
                  >
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
            .filter(
              (item) =>
                item.type === "specialty cake" &&
                variants.some((v) => v.menu_id === item.id) &&
                variants
                  .filter((v) => v.menu_id === item.id)
                  .some((v) => v.availability),
            )
            .map((item, index) => {
              const itemPrices = variants
                .filter((v) => v.menu_id === item.id)
<<<<<<< HEAD
                .some((v) => v.availability),
          )
          .map((item, index) => {
            const itemPrices = variants
              .filter((v) => v.menu_id === item.id)
              .map((v) => v.price);

            const minPrice = Math.min(...itemPrices);
            const maxPrice = Math.max(...itemPrices);

            const priceDisplay =
              minPrice === maxPrice
                ? `$${minPrice}`
                : `$${minPrice} - $${maxPrice}`;

            return (
              <motion.div
                onClick={() => {
                  router.push(`/menu/item/${item.id}`);
                }}
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-white p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px]">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={baseUrl + item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
                <h3
                  className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}
=======
                .map((v) => v.price);

              const minPrice = Math.min(...itemPrices);
              const maxPrice = Math.max(...itemPrices);

              const priceDisplay =
                minPrice === maxPrice
                  ? `$${minPrice}`
                  : `$${minPrice} - $${maxPrice}`;

              return (
                <motion.div
                  onClick={() => {
                    router.push(`/menu/item/${item.id}`);
                  }}
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
>>>>>>> origin/updated_menu
                >
                  <div className="cursor-pointer bg-white p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px]">
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src="/images/cake.png"
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  <h3
                    className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}
                  >
                    {item.name}
                  </h3>

                  <p
                    className={`${josefin.className} text-lg leading-relaxed max-w-[250px] font-bold mb-2`}
                  >
                    {priceDisplay}
                  </p>

                  <p
                    className={`${josefin.className} text-sm leading-relaxed max-w-[250px] opacity-90`}
                  >
                    {item.description}
                  </p>
                </motion.div>
              );
            })}

          {/*If menu variant doesn't exist for a menu item, grey it out and show it as COMING SOON with no price*/}
          {items
            .filter(
              (item) =>
                item.type === "specialty cake" &&
                (!variants.some((v) => v.menu_id === item.id) ||
                  variants
                    .filter((v) => v.menu_id === item.id)
                    .every((v) => !v.availability)),
            )
            .map((item, index) => {
              const status = !variants.some((v) => v.menu_id === item.id)
                ? "COMING SOON"
                : "SOLD OUT";

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

                  <h3
                    className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}
                  >
                    {item.name}
                  </h3>

                  <p
                    className={`${josefin.className} text-lg leading-relaxed max-w-[250px] mb-2`}
                  >
                    {status}
                  </p>

                  <p
                    className={`${josefin.className} text-sm leading-relaxed max-w-[250px] opacity-90`}
                  >
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
            .filter(
              (item) =>
                item.category === "party_item" &&
                variants.some((v) => v.menu_id === item.id) &&
                variants
                  .filter((v) => v.menu_id === item.id)
<<<<<<< HEAD
                  .every((v) => !v.availability)),
          )
          .map((item, index) => {
            const status = !variants.some((v) => v.menu_id === item.id)
              ? "COMING SOON"
              : "SOLD OUT";

            return (
              <motion.div
                onClick={() => {
                  router.push(`/menu/item/${item.id}`);
                }}
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-gray-200 p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px] opacity-50">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={baseUrl + item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
=======
                  .some((v) => v.availability),
            )
            .map((item, index) => {
              const itemPrices = variants
                .filter((v) => v.menu_id === item.id)
                .map((v) => v.price);

              const minPrice = Math.min(...itemPrices);
              const maxPrice = Math.max(...itemPrices);

              const priceDisplay =
                minPrice === maxPrice
                  ? `$${minPrice}`
                  : `$${minPrice} - $${maxPrice}`;

              return (
                <motion.div
                  onClick={() => {
                    router.push(`/menu/item/${item.id}`);
                  }}
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="cursor-pointer bg-white p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px]">
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src="/images/cake.png"
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
>>>>>>> origin/updated_menu
                  </div>
                  <h3
                    className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}
                  >
                    {item.name}
                  </h3>

                  <p
                    className={`${josefin.className} text-lg leading-relaxed max-w-[250px] font-bold mb-2`}
                  >
                    {priceDisplay}
                  </p>

                  <p
                    className={`${josefin.className} text-sm leading-relaxed max-w-[250px] opacity-90`}
                  >
                    {item.description}
                  </p>
                </motion.div>
              );
            })}

          {/*If menu variant doesn't exist for a menu item, grey it out and show it as COMING SOON with no price*/}
          {items
            .filter(
              (item) =>
                item.category === "party_item" &&
                (!variants.some((v) => v.menu_id === item.id) ||
                  variants
                    .filter((v) => v.menu_id === item.id)
                    .every((v) => !v.availability)),
            )
            .map((item, index) => {
              const status = !variants.some((v) => v.menu_id === item.id)
                ? "COMING SOON"
                : "SOLD OUT";

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

                  <h3
                    className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}
                  >
                    {item.name}
                  </h3>

                  <p
                    className={`${josefin.className} text-lg leading-relaxed max-w-[250px] mb-2`}
                  >
                    {status}
                  </p>

                  <p
                    className={`${josefin.className} text-sm leading-relaxed max-w-[250px] opacity-90`}
                  >
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
        </div>
      </>
    )}
    </div>
  );
}

function MenuItemCard({ item, variants, index, router }: any) {
  const itemVariants = variants.filter((v: any) => v.menu_id === item.id);
  const isAvailable = itemVariants.some((v: any) => v.availability);
  
  const itemPrices = itemVariants.map((v: any) => v.price);
  const minPrice = Math.min(...itemPrices);
  const maxPrice = Math.max(...itemPrices);
  const priceDisplay = minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;
  const status = !itemVariants.length ? "COMING SOON" : "SOLD OUT";

  return (
    <motion.div 
      onClick={() => isAvailable && router.push(`/menu/item/${item.id}`)}
      key={item.id} 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.1 }} 
      className="flex flex-col items-center text-center cursor-pointer"
    >
      <div className={`${isAvailable ? "bg-white" : "bg-gray-200 opacity-50"} p-4 rounded-xl shadow-2xl mb-6 w-full max-w-[300px]`}>
        <div className="relative aspect-[4/5] w-full">
          <Image src="/images/cake.png" alt={item.name} fill className={`object-cover rounded-lg ${!isAvailable ? "grayscale" : ""}`} />
        </div>
      </div>
      <h3 className={`${josefin.className} uppercase tracking-widest text-xl font-bold mb-1`}>{item.name}</h3>
      <p className={`${josefin.className} text-lg font-bold mb-2`}>
        {isAvailable ? priceDisplay : status}
      </p>
      <p className={`${josefin.className} text-sm opacity-90 max-w-[250px]`}>{item.description}</p>
    </motion.div>
  );
}
