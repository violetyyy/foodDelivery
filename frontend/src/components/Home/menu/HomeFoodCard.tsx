"use client";
import { Food } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export const HomeFoodCard = ({ food }: { food: Food }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addToCart = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="p-4 rounded-[20px] border border-[#E4E4E7] flex flex-col gap-5 bg-white">
      <div
        className="w-full h-[210px] bg-center bg-cover rounded-xl p-5 flex justify-end items-end"
        style={{ backgroundImage: `url(${food.image})` }}
      >
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <button className="bg-white rounded-full p-4 text-red-500 hover:bg-[#E4E4E7] cursor-pointer">
              <Plus></Plus>
            </button>
          </DialogTrigger>
          <DialogContent className=" h-fit bg-white flex gap-5   ">
            <img
              src={food.image}
              alt={food.foodName}
              className="w-[300px] h-[300px] object-cover rounded-xl "
            />
            <div className="flex flex-col gap-2 justify-between w-[1000px] ">
              <div className="flex flex-col gap-2">
                <DialogTitle className="text-2xl font-semibold text-red-500">
                  {food.foodName}
                </DialogTitle>
                <p className="">{food.ingredients}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <p>Total Price</p>
                    <p className="text-[#09090B] text-lg font-semibold">
                      ${food.price}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button className="border p-1 rounded-full">
                      <Minus />
                    </button>
                    <p>1</p>
                    <button className="border p-1 rounded-full">
                      <Plus />
                    </button>
                  </div>
                </div>
                <button
                  className="bg-black text-white px-4 py-2 rounded-full"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-red-500">{food.foodName}</p>
          <p className="text-[#09090B] text-lg font-semibold">${food.price}</p>
        </div>
        <p className="text-sm text-[#09090B]">{food.ingredients}</p>
      </div>
    </div>
  );
};

export default HomeFoodCard;
