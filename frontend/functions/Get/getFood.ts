import { Food } from "@/app/(types)/page";
import { url } from "@/utils/url";
import { SetStateAction } from "react";

export const fetchFoods = async (setFoods: {
  (value: SetStateAction<Food[]>): void;
  (arg0: any): void;
}) => {
  try {
    const response = await fetch(`${url}food`);
    const responseData = await response.json();
    setFoods(responseData.data);
  } catch (error) {
    console.log(error);
  }
};
