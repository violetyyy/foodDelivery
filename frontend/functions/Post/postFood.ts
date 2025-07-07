import { NewFood } from "@/app/(types)/page";
import { url } from "@/utils/url";

export const postFood = async (food: NewFood) => {
  try {
    const response = await fetch(`${url}food`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(food),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Successfully posted:", data);
    return data;
  } catch (error) {
    console.error("Error posting food:", error);
  }
};
