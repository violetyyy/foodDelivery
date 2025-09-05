import { FoodOrder } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postOrder = async (order: Partial<FoodOrder>): Promise<FoodOrder> => {
  const response = await axios.post(`${API_URL}/food-order`, order);
  return response.data.data;
}; 