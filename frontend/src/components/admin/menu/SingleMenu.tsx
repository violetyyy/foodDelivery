import { Category, Food } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import AdminFoodCard from "./AdminFoodCard";
import FoodAddModal from "../modals/FoodAddModal";

const Loader = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
);

const SingleMenu = ({
  category,
  foods,
  fetchAllData,
}: {
  category: Category;
  foods: Food[];
  fetchAllData: () => void; // Add this prop
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  return (
    <div className="p-6 flex flex-col gap-4 animate-fadeIn shadow-sm rounded-xl bg-white">
      <p className="text-xl font-semibold text-[#09090B]">
        {category?.categoryName} (
        {foods &&
          foods?.filter(
            (food) => food?.category?.categoryName === category?.categoryName
          ).length}
        )
      </p>

      <div className="grid grid-cols-4 gap-6">
        <div
          className="py-2 px-4 rounded-[20px] border flex items-center justify-center flex-col gap-6 border-red-500 hover:bg-red-50 transition duration-200 cursor-pointer border-dashed min-h-[375px] shadow-md focus:ring-2 focus:ring-red-400"
          onClick={() => {
            setAddLoading(true);
            setIsModalOpen(true);
            setTimeout(() => setAddLoading(false), 500); // fake loader for polish
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setAddLoading(true);
              setIsModalOpen(true);
              setTimeout(() => setAddLoading(false), 500);
            }
          }}
        >
          <div className="rounded-full bg-red-500 flex justify-center items-center size-[40px] transition cursor-pointer duration-200 shadow-md hover:bg-red-600">
            {addLoading ? <Loader /> : <Plus size={16} color="white" />}
          </div>
          <p className="text-sm font-medium text-[#18181B]">
            Add new Dish to {category?.categoryName}
          </p>
        </div>
        {foods &&
          foods
            ?.filter(
              (food) => food?.category?.categoryName === category?.categoryName
            )
            .map((food, index) => {
              return (
                <AdminFoodCard
                  food={food}
                  key={index}
                  fetchAllData={fetchAllData}
                />
              );
            })}
      </div>
      {isModalOpen && (
        <FoodAddModal
          setIsModalOpen={setIsModalOpen}
          category={category}
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

export default SingleMenu;
