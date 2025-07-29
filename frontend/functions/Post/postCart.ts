import { CartItem } from "@/app/(types)/page";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const createOrderFromCart = async (userId: string, cartItems: CartItem[]) => {
  try {
    const foodOrderItems = cartItems.map(item => ({
      food: item.food._id,
      quantity: item.quantity
    }));

    const response = await fetch(`${API_BASE_URL}/api/foodOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userId,
        foodOrderItems
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating order from cart:", error);
    throw error;
  }
};