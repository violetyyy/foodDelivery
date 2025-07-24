import { deleteFood } from "@/functions/Delete";
import { fetchCategories } from "@/functions/Get";
import { patchFood } from "@/functions/Patch";
import { Category, Food } from "@/app/(types)/page";
import { Trash, X } from "lucide-react";
import { useEffect, useState } from "react";

interface FoodAddModalProps {
  setIsModalOpen: (open: boolean) => void;
  food: Food;
  fetchAllData: () => void;
}

const FoodEditModal = ({
  setIsModalOpen,
  food,
  fetchAllData,
}: FoodAddModalProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories(setCategories);
  }, []);

  const [inputs, setInputs] = useState({
    foodName: food.foodName,
    price: food.price,
    ingredients: food.ingredients,
    image: food.image,
    category: food.category.categoryName,
  });
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const delFood = async () => {
    try {
      await deleteFood(food._id);
      fetchAllData();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const submit = async () => {
    try {
      await patchFood(food._id, inputs);
      setIsModalOpen(false);
      fetchAllData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full fixed flex justify-center items-center left-0 top-0 z-30 bg-black/50 cursor-default text-[#09090B]">
      <div className="bg-white rounded-xl p-6 flex flex-col gap-6 min-w-lg">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[16px]">Dishes Info</p>
          <button
            className="rounded-full bg-[#F4F4F5] p-2 hover:bg-[#E4E4E7] transition duration-200 cursor-pointer"
            onClick={handleClose}
          >
            <X />
          </button>
        </div>
        <div className="flex  gap-4">
          <p className="text-xs text-[#71717A] w-2/5 ">Dish Name</p>
          <input
            type="text"
            className="px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none w-full"
            placeholder="Type food name"
            value={inputs.foodName}
            onChange={(e) => setInputs({ ...inputs, foodName: e.target.value })}
          />
        </div>
        <div className="flex  gap-4">
          <p className="text-xs text-[#71717A] w-2/5 ">Dish Category</p>
          <input
            type="text"
            className="px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none w-full"
            placeholder="Type food name"
            value={inputs.category}
            onChange={(e) => setInputs({ ...inputs, foodName: e.target.value })}
          />
        </div>
        <div className="flex  gap-4">
          <p className="text-xs text-[#71717A] w-2/5 ">Ingredients</p>
          <textarea
            className="w-full px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none"
            placeholder="Type food name"
            value={inputs.ingredients}
            rows={3}
            onChange={(e) =>
              setInputs({ ...inputs, ingredients: e.target.value })
            }
          />
        </div>
        <div className="flex  gap-4">
          <p className="text-xs text-[#71717A] w-2/5 ">Price</p>
          <input
            type="text"
            className="px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none w-full"
            placeholder="Type food name"
            value={inputs.price}
            onChange={(e) => setInputs({ ...inputs, price: e.target.value })}
          />
        </div>
        <div className="flex  gap-4">
          <p className="text-xs text-[#71717A] w-2/5 ">Image</p>
          <input
            type="text"
            className="px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none w-full"
            placeholder="Type food name"
            value={inputs.image}
            onChange={(e) => setInputs({ ...inputs, image: e.target.value })}
          />
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            className=" text-red-500 px-3 py-2 rounded-md cursor-pointer border hover:bg-red-50"
            onClick={delFood}
          >
            <Trash strokeWidth={1} />
          </button>
          <button
            className="bg-[#18181B] text-white px-3 py-2 rounded-md cursor-pointer"
            onClick={submit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodEditModal;
