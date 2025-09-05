"use client";

import { createContext, useState, useEffect } from "react";

const contextState = {
  cartItems: [],
  setCartItems: (_cartItems: any) => {},
  updateQuantity: (_foodId: string, _quantity: number) => {},
};

export const cartContext = createContext(contextState);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Load cart data from localStorage on initialization
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Save cart data to localStorage whenever cartItems changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Add updateQuantity function
  const updateQuantity = (foodId: string, quantity: number) => {
    setCartItems((prevItems: any[]) =>
      prevItems.map((item) =>
        item._id === foodId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <cartContext.Provider value={{ cartItems, setCartItems, updateQuantity }}>
      {children}
    </cartContext.Provider>
  );
};
