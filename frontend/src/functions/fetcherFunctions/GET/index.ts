import { Category, Food, Order } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCategories = async (setCategories: (categories: Category[]) => void): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}/food-category`);
    setCategories(response.data.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    setCategories([]);
  }
};

export const fetchFoods = async (setFoods: (foods: Food[]) => void): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}/food`);
    setFoods(response.data.data);
  } catch (error) {
    console.error("Error fetching foods:", error);
    setFoods([]);
  }
};

export const fetchOrders = async (setOrders: (orders: Order[]) => void, token: string): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}/food-order`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    setOrders(response.data.data);
  } catch (error) {
    console.error("Error fetching orders:", error);
    setOrders([]);
  }
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_URL}/food-category`);
  return response.data.data;
};

export const getFoods = async (): Promise<Food[]> => {
  const response = await axios.get(`${API_URL}/food`);
  return response.data.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get(`${API_URL}/food-order`);
  return response.data.data;
};

export const getUserOrders = async (userId: string, token: string): Promise<Order[]> => {
  const response = await axios.get(`${API_URL}/food-order/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data.data;
};