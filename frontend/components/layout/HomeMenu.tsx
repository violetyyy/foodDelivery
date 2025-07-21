// "use client";

// import { fetchCategories, fetchFoods } from "@/functions/Get";
// import { Food, Category } from "@/app/(types)/page";
// import { useEffect, useState } from "react";
// import FoodCard from "./Foodcard";

// export const HomeMenu = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [foods, setFoods] = useState<Food[]>([]);

//   useEffect(() => {
//     fetchCategories(setCategories);
//     fetchFoods(setFoods);
//   }, []);
//   console.log("foods state:", foods);

//   return (
//     <div className="flex flex-col gap-[54px] ">
//       {categories.map((category, index) => {
//         return (
//           <div className="container flex flex-col gap-[54px]" key={index}>
//             <h2 className="font-semibold text-3xl text-[#FFFFFF]">
//               {category.categoryName}
//             </h2>
//             <div className="grid grid-cols-3 gap-9">
//               {foods &&
//                 foods
//                   .filter(
//                     (food) =>
//                       food.category.categoryName === category.categoryName
//                   )
//                   .map((food, index) => {
//                     return <FoodCard food={food} key={index}></FoodCard>;
//                   })}
//             </div>
//             <div className="container flex flex-col gap-[54px]">
//               <h2 className="font-semibold text-3xl text-[#FFFFFF]">
//                 All Foods
//               </h2>
//               <div className="grid grid-cols-3 gap-9">
//                 {foods.map((food, index) => (
//                   <FoodCard food={food} key={index} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

"use client";

import { fetchCategories, fetchFoods } from "@/functions/Get";
import { Food, Category } from "@/app/(types)/page";
import { useEffect, useState } from "react";
import FoodCard from "./Foodcard";

export const HomeMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    fetchCategories(setCategories);
    fetchFoods(setFoods);
  }, []);

  console.log("foods state:", foods);

  return (
    <div className="container flex flex-col gap-[54px]">
      <h2 className="font-semibold text-3xl text-[#FFFFFF]">All Foods</h2>
      <div className="grid grid-cols-3 gap-12">
        {foods.map((food, index) => (
          <FoodCard food={food} key={index} />
        ))}
      </div>
    </div>
  );
};
