import { Food } from "@/types";
import { Pen } from "lucide-react";
import { useState } from "react";
import FoodEditModal from "../modals/FoodEditModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const AdminFoodCard = ({
  food,
  fetchAllData,
}: {
  food: Food;
  fetchAllData: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 rounded-[20px] border border-[#E4E4E7] flex flex-col gap-5 bg-white shadow-md hover:shadow-lg transition duration-200 animate-fadeIn">
      <div
        className="w-full h-[210px] bg-center bg-cover rounded-xl p-5 flex justify-end items-end "
        style={{ backgroundImage: `url(${food.image})` }}
      >
        <div
          className="bg-white rounded-full p-4 text-red-500 hover:bg-[#E4E4E7] cursor-pointer bg-no-repeat focus:ring-2 focus:ring-red-400 transition duration-150"
          // onClick={() => {
          //   setIsModalOpen(true);
          // }}
          // tabIndex={0}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") setIsModalOpen(true);
          // }}
        >
          <Dialog>
            <DialogTrigger>
              <Pen />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-red-500">{food.foodName}</p>
          <p className="text-[#09090B] text-lg font-semibold">${food.price}</p>
        </div>
        <p className="text-sm text-[#09090B]">{food.ingredients}</p>
      </div>
      {isModalOpen && (
        <FoodEditModal
          setIsModalOpen={setIsModalOpen}
          food={food}
          fetchAllData={fetchAllData}
        />
      )}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease;
        }
      `}</style>
    </div>
  );
};

export default AdminFoodCard;
