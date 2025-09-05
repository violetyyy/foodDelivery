import { Category, Food } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postCategory = async (category: Partial<Category>): Promise<Category> => {
  const response = await axios.post(`${API_URL}/food-category`, category);
  return response.data.data;
};

export const postFood = async (food: Partial<Food>): Promise<Food> => {
  const response = await axios.post(`${API_URL}/food`, food);
  return response.data.data;
}; 