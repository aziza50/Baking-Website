import React from "react";
import { crimson, dawn } from "@/styles/fonts";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ amount: string }>;
}) => {
  const amountNumber = await searchParams;
  const amount = parseFloat(amountNumber.amount);
  //empty cart here then!

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
      <div className="text-[#74070E] bg-white w-100 h-100 overflow-auto flex flex-col items-center justify-center gap-5 border-2 border-[#74070E] rounded-lg p-5">
        <h1 className={`${dawn.className} mt-[-10] text-[#74070E] text-[50px]`}>
          Thank you for shopping with us!
        </h1>
        <h1 className={`${crimson.className} text-[#74070E] text-[30px]`}>
          Order Successful
        </h1>
        <p className={`${crimson.className} text-[#74070E] text-[30px]`}>
          Amount: ${amount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default page;
