import { Category, Food } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance with auth headers
const createAuthenticatedRequest = () => {
  const token = localStorage.getItem("userToken");
  return axios.create({
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });
};

export const patchFood = async (foodId: string, food: {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  quantity: number;
  category: string;
}): Promise<Food> => {
  const authAxios = createAuthenticatedRequest();
  const response = await authAxios.put(`${API_URL}/food/${foodId}`, food);
  return response.data.data;
};

export const patchCategory = async (categoryId: string, category: Partial<Category>): Promise<Category> => {
  const authAxios = createAuthenticatedRequest();
  const response = await authAxios.put(`${API_URL}/food-category/${categoryId}`, category);
  return response.data.data;
};

export const patchOrder = async (orderId: string, orderData: { status: string }): Promise<any> => {
  const authAxios = createAuthenticatedRequest();
  const response = await authAxios.put(`${API_URL}/food-order/${orderId}`, orderData);
  return response.data.data;
};