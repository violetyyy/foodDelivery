import { Category } from "@/app/(types)/page";
import { url } from "@/utils/url";
import { SetStateAction } from "react";

export const fetchCategories = async (
  setCategories: (value: SetStateAction<Category[]>) => void
) => {
  try {
    const response = await fetch(`${url}categories`);
    const responseData = await response.json();
    console.log("Raw category response:", responseData);

    setCategories(responseData.data as Category[]);
  } catch (error) {
    console.log("Category fetch error:", error);
  }
};
