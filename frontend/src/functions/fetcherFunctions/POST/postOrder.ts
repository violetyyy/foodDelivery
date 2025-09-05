import { FoodOrder } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postOrder = async (order: Partial<FoodOrder>, token: string): Promise<FoodOrder> => {
  const response = await axios.post(`${API_URL}/food-order`, order, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data.data;
}; 