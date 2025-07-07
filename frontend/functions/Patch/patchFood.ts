import { Food } from "@/app/(types)/page";
import { url } from "@/utils/url";

export interface FoodUpdateInput {
  foodName: string;
  price: string;
  ingredients: string;
  image: string;
  category: string;
}

export const patchFood = async (foodId: string, food: FoodUpdateInput) => {
  try {
    const data = {
      foodName: food.foodName,
      price: food.price,
      ingredients: food.ingredients,
      image: food.image,
      category: food.category,
    };
    await fetch(`${url}food/${foodId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return "Success";
  } catch (error) {
    console.error("Error updating food:", error);
  }
};
