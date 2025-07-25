"use client";

import { useEffect, useState } from "react";
import { fetchCategories, fetchFoods } from "@/functions/Get";
import { Category, Food } from "@/app/(types)/page";
import FoodCard from "./Foodcard";

export const HomeMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    fetchCategories((rawData) => {
      console.log("Raw Categories:", rawData);

      const data = rawData as Category[];

      const uniqueCategories = Array.from(
        new Map(data.map((cat) => [cat.name, cat])).values()
      );

      setCategories(uniqueCategories);
    });

    fetchFoods((data) => {
      console.log("Foods:", data);
      setFoods(data);
    });
  }, []);

  return (
    <div className="container flex flex-col gap-[54px]">
      {categories.map((category) => {
        const categoryFoods = foods.filter(
          (food) => food.category === category.name
        );

        if (categoryFoods.length === 0) return null;

        return (
          <div key={category._id} className="flex flex-col gap-6">
            <h2 className="font-semibold text-3xl text-[#FFFFFF]">
              {category.name}
            </h2>
            <div className="grid grid-cols-3 gap-12">
              {categoryFoods.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
