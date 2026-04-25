import React from "react";

const page = ({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) => {
  return (
    <div>
      <h1>Order Successful</h1>
      <p>Amount: ${amount}</p>
    </div>
  );
};

export default page;
