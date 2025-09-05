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

export const deleteFood = async (foodId: string): Promise<void> => {
  const authAxios = createAuthenticatedRequest();
  await authAxios.delete(`${API_URL}/food/${foodId}`);
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  const authAxios = createAuthenticatedRequest();
  await authAxios.delete(`${API_URL}/food-category/${categoryId}`);
};