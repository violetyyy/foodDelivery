import { url } from "@/utils/url";

export const deleteFood = async (foodId: string) => {
  try {
    const response = await fetch(`${url}food/${foodId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Successfully deleted food:", data);
  } catch (error) {
    console.error("Error deleting Food:", error);
  }
};
