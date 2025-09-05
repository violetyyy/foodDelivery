import { Category } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_URL}/food-category`);
  return response.data.data;
};
