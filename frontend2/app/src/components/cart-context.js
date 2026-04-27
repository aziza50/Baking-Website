"use client";
import React, { createContext, useState, useContext, use } from "react";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(0);

  const updateCart = (newQuantity) => {
    //need to add to current not override though lol
    setQuantity((prevQuantity) => Math.max(0, prevQuantity + newQuantity));
  };

  const setCartQuantity = (nextQuantity) => {
    setQuantity(Math.max(0, Number(nextQuantity) || 0));
  };

  return (
    <cartContext.Provider value={{ quantity, updateCart, setCartQuantity }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(cartContext);
};
