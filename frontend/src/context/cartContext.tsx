"use client";

import { createContext, useState, useEffect } from "react";
import { CartItem } from "@/types";

const contextState = {
  cartItems: [] as CartItem[],
  setCartItems: (_cartItems: CartItem[]) => {},
  updateQuantity: (_foodId: string, _quantity: number) => {},
  addToCart: (_food: CartItem) => {},
  removeFromCart: (_foodId: string) => {},
};

export const cartContext = createContext(contextState);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Load cart data from localStorage on initialization
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
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
    setCartItems((prevItems: CartItem[]) =>
      prevItems.map((item) =>
        item._id === foodId ? { ...item, quantity } : item
      )
    );
  };

  // Add to cart function
  const addToCart = (food: CartItem) => {
    setCartItems((prevItems: CartItem[]) => {
      const existingItem = prevItems.find((item) => item._id === food._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === food._id
            ? { ...item, quantity: item.quantity + food.quantity }
            : item
        );
      }
      return [...prevItems, food];
    });
  };

  // Remove from cart function
  const removeFromCart = (foodId: string) => {
    setCartItems((prevItems: CartItem[]) =>
      prevItems.filter((item) => item._id !== foodId)
    );
  };

  return (
    <cartContext.Provider value={{ cartItems, setCartItems, updateQuantity, addToCart, removeFromCart }}>
      {children}
    </cartContext.Provider>
  );
};
