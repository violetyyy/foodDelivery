import { url } from "@/utils/url";

export const postCategory = async (categoryName: string) => {
  console.log(categoryName);

  try {
    const response = await fetch(`${url}food-category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName: categoryName }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Successfully posted:", data);
    return data;
  } catch (error) {
    console.error("Error posting category:", error);
    throw error;
  }
};
