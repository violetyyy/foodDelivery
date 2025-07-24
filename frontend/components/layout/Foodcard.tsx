"use client";

import { Food } from "@/app/(types)/page";
import { Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export const FoodCard = ({ food }: { food: Food }) => {
  const [quantityCount, setCount] = useState(1);

  const handleDecrease = () => {
    if (quantityCount > 1) setCount(quantityCount - 1);
  };

  const handleIncrease = () => {
    setCount(quantityCount + 1);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-4 rounded-[20px] border border-[#E4E4E7] flex flex-col gap-5 bg-white">
          <div
            className="w-full h-[210px] bg-center bg-cover rounded-xl p-5 flex justify-end items-end "
            style={{ backgroundImage: `url(${food.image})` }}
          >
            <div className="bg-white rounded-full p-4 text-red-500 hover:bg-[#E4E4E7] cursor-pointer">
              <Plus></Plus>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-semibold text-red-500">
                {food.foodName}
              </p>
              <p className="text-[#09090B] text-lg font-semibold">
                ${food.price}
              </p>
            </div>
            <p className="text-sm text-[#09090B]">{food.ingredients}</p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="w-[826px] !max-w-[826px]">
        <div className="flex gap-6 p-6 w-full">
          <div className="w-[50%]">
            <img
              src={food.image}
              alt={food.foodName}
              className="rounded-[12px] w-full aspect-square object-cover"
            />
          </div>
          <div className="flex flex-col justify-between w-[50%]">
            <div className="flex flex-col gap-3">
              <h1 className=" text-3xl font-semibold mt-2 text-[#EF4444]">
                {food.foodName}
              </h1>
              <p className="text-[16px] text-foreground w-full">
                {food.ingredients}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="text-[16px]">Total Price</p>
                  <p className="text-2xl font-semibold">
                    ${(food.price * quantityCount).toFixed(2)}
                  </p>
                </div>
                <div className="flex text-[16px] gap-3 items-center">
                  <button
                    className="border border-[#E4E4E7] rounded-full p-4"
                    onClick={handleDecrease}
                    disabled={quantityCount <= 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3.33301 8H12.6663"
                        stroke="#18181B"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <p className="text-[18px] font-semibold w-5 justify-center flex">
                    {quantityCount}
                  </p>
                  <button
                    className="border border-[#E4E4E7] rounded-full p-4"
                    onClick={handleIncrease}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M7.99967 3.33594V12.6693M3.33301 8.0026H12.6663"
                        stroke="#18181B"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <Button className="w-full rounded-full py-2 px-8">
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FoodCard;
