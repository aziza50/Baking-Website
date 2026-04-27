"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { josefin } from "@/styles/fonts";
import { Button } from "@/components/ui/button";
// import CheckoutPage from "@/components/checkout-page";
import MenuItem from "@/components/menu-item";
import { toast } from "sonner";
import { getOrCreateCartId } from "@/app/menu/item/[item_id]/actions";
import { getCartItems } from "@/app/checkout/process/actions";
import { Input } from "@/components/ui/input";
import { useCart } from "@/components/cart-context";
interface CartItem {
  holds_id: number;
  cart_id: number;
  menu_id: number;
  menu_variant_id: number;
  topping_id: number | null;
  modification_id: number | null;
  quantity: number;
  product_name: string;
  product_image_url: string | null;
  product_size: string;
  product_price: number;
  variant_quantity: number;
  variant_count: number;
}

const page = () => {
  const supabase = createClient();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartId, setCartId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    async function checkAuthStatus() {
      const user = await supabase.auth.getUser();
      setIsAuthenticated(!!user.data.user);
    }

    checkAuthStatus();
  }, [supabase.auth]);

  useEffect(() => {
    async function retrieveCartId() {
      try {
        const id = await getOrCreateCartId();
        setCartId(id);
      } catch (error) {
        console.error("Error retrieving cart ID:", error);
      }
    }

    retrieveCartId();
  }, []);

  useEffect(() => {
    async function retrieveCartItems() {
      if (!cartId) {
        return;
      }

      const data = await getCartItems(cartId);
      if (!data.ok) {
        console.error("Failed to fetch cart items");
        return;
      }

      setCartItems((data.data ?? []) as CartItem[]);
    }

    retrieveCartItems();
  }, [cartId]);

  async function handleForward() {
    if (!isAuthenticated) {
      toast.error("Please log in to proceed to checkout.");
      return;
    }

    setStep((prev) => (prev === 1 ? 2 : prev === 2 ? 3 : prev));
  }

  function handleBack() {
    setStep((prev) => (prev === 2 ? 1 : prev === 3 ? 2 : prev));
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.product_price) * Number(item.quantity),
    0,
  );

  async function handleSubmitContactInfo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //ensure all elements are filled out
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const lastName = formData.get("last-name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    console.log("Contact Info:", { name, lastName, email, phone });
    if (!name || !lastName || !email || !phone) {
      toast.error("Please fill out all fields.");
      return;
    }
    //for now, no validation

    handleForward();
  }

  return (
    <div className="min-h-screen pt-32 pb-20 gap-10 flex-col flex justify-start overflow-x-hidden">
      <div className="justify-center flex flex-row text-[#74070E] text-2xl px-6">
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

          {step === 1 && (
            <div className="flex flex-col gap-6">
              {cartItems.length === 0 ? (
                <p className="text-[16px] text-[#74070E]/80">
                  Your cart is empty.
                </p>
              ) : (
                cartItems.map((item) => (
                  <MenuItem
                    key={`${item.menu_id}-${item.menu_variant_id}-${item.topping_id ?? "none"}-${item.modification_id ?? "none"}`}
                    menuItemInfo={{
                      holds_id: Number(item.holds_id),
                      product_name: item.product_name,
                      product_image_url: item.product_image_url,
                      product_size: item.product_size,
                      product_price: Number(item.product_price),
                      quantity: Number(item.quantity),
                      cart_id: Number(item.cart_id),
                      menu_id: Number(item.menu_id),
                      variant_quantity: Number(item.variant_quantity),
                      variant_count: Number(item.variant_count),
                      variant_id: Number(item.menu_variant_id),
                      topping_id: item.topping_id
                        ? Number(item.topping_id)
                        : null,
                      modification_id: item.modification_id
                        ? Number(item.modification_id)
                        : null,
                    }}
                  />
                ))
              )}
            </div>
          )}

          {step == 2 && (
            <div className="flex flex-col">
              <form onSubmit={(e) => handleSubmitContactInfo(e)}>
                <div className="flex flex-row mt-7 gap-15 w-full">
                  <div className="w-100 flex flex-col gap-5 text-[15px]">
                    <label htmlFor="name">First Name</label>
                    <Input
                      name="name"
                      type="text"
                      id="name"
                      className="rounded-none border-0 border-b border-[#74070E] px-0"
                    />
                    <label htmlFor="email">Email</label>
                    <Input
                      name="email"
                      type="email"
                      id="email"
                      className="rounded-none border-0 border-b border-[#74070E] px-0"
                    />
                  </div>
                  <div className="w-100 flex flex-col gap-5 text-[15px]">
                    <label htmlFor="last-name">Last Name</label>
                    <Input
                      name="last-name"
                      type="text"
                      id="last-name"
                      className="rounded-none border-0 border-b border-[#74070E] px-0"
                    />
                    <label htmlFor="phone">Phone</label>
                    <Input
                      name="phone"
                      type="text"
                      id="phone"
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
                    type="submit"
                    variant="magnolia"
                    className="w-30 mr-0"
                  >
                    Proceed
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* {step == 3 && <CheckoutPage amount={subtotal} />} */}
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
          {(step == 3 || step == 2) && (
            <div className="max-h-[calc(100vh-22rem)] overflow-y-auto overflow-x-hidden pr-2 flex flex-col gap-6">
              {cartItems.map((item) => (
                <MenuItem
                  key={`${item.menu_id}-${item.menu_variant_id}-${item.topping_id ?? "none"}-${item.modification_id ?? "none"}`}
                  menuItemInfo={{
                    product_name: item.product_name,
                    product_image_url: item.product_image_url,
                    product_size: item.product_size,
                    product_price: Number(item.product_price),
                    quantity: Number(item.quantity),
                    cart_id: Number(item.cart_id),
                    menu_id: Number(item.menu_id),
                    variant_quantity: Number(item.variant_quantity),
                    variant_count: Number(item.variant_count),
                    variant_id: Number(item.menu_variant_id),
                  }}
                />
              ))}
            </div>
          )}
          <div className="flex flex-row gap-70 mt-10">
            <h3>Subtotal</h3>
            <h3>${subtotal.toFixed(2)}</h3>
          </div>
          <div className="h-px w-full bg-[#74070E] my-4" />
          <div className="flex flex-row gap-75">
            <h3>Total</h3>
            <h3>${subtotal.toFixed(2)}</h3>
          </div>
          <div className="h-px w-full bg-[#74070E] my-4" />
          <div className="flex flex-row gap-35">
            {step == 1 && (
              <h3
                className="cursor-pointer underline font-medium text-[15px]"
                onClick={() => router.push("/menu/collection")}
              >
                Continue Shopping
              </h3>
            )}
            {step == 1 && (
              <Button
                onClick={handleForward}
                className="cursor-pointer w-30"
                variant="magnolia"
              >
                Checkout
              </Button>
            )}
            {step == 3 && (
              <h3
                onClick={handleBack}
                className="cursor-pointer underline font-medium text-[17px]"
              >
                Back to Contact
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
