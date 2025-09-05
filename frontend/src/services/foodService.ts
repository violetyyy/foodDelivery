import { Food } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFoods = async (): Promise<Food[]> => {
  const response = await axios.get(`${API_URL}/food`);
  return response.data.data;
};
