import { Food } from "@/app/(types)/page";
import { url } from "@/utils/url";

export const patchFood = async (foodId: string, food: Food) => {
  try {
    const data = {
      foodName: food.foodName,
      price: food.price,
      ingredients: food.ingredients,
      image: food.image,
      category: food.category.categoryName,
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
