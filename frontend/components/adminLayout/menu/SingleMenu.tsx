import { Category, Food } from "@/app/(types)/page";
import { Plus } from "lucide-react";
import { useState } from "react";
import AdminFoodCard from "./AdminFoodCard";
import FoodAddModal from "../modals/FoodAddModal";

const SingleMenu = ({
  category,
  foods,
  fetchAllData,
}: {
  category: Category;
  foods: Food[];
  fetchAllData: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 flex flex-col gap-4">
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
          className="py-2 px-4 rounded-[20px] border flex items-center justify-center flex-col gap-6 border-red-500 hover:bg-red-50
         transition duration-200 cursor-pointer border-dashed  min-h-[375px]"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <div className="rounded-full bg-red-500 flex justify-center items-center size-[40px] transition cursor-pointer duration-200">
            <Plus size={16} color="white" />
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
                  categoryId={category._id}
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
    </div>
  );
};

export default SingleMenu;
