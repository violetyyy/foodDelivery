import { Category } from "@/app/(types)/page";
import { url } from "@/utils/url";
import { SetStateAction } from "react";

export const fetchCategories = async (setCategories: {
  (value: SetStateAction<Category[]>): void;
  (arg0: any): void;
}) => {
  try {
    const response = await fetch(`${url}food-category`);
    const responseData = await response.json();
    setCategories(responseData.data);
  } catch (error) {
    console.log(error);
  }
};
