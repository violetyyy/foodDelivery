import { postFood } from "@/functions/Post";
import { Category } from "@/app/(types)/page";
import { X } from "lucide-react";
import { useState } from "react";

interface FoodAddModalProps {
  setIsModalOpen: (open: boolean) => void;
  category: Category;
  fetchAllData: () => void;
}

const FoodAddModal = ({
  setIsModalOpen,
  category,
  fetchAllData,
}: FoodAddModalProps) => {
  const [inputs, setInputs] = useState({
    foodName: "",
    price: "",
    ingredients: "",
    image: "",
  });

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const newFood = {
    foodName: inputs.foodName,
    price: inputs.price,
    image: inputs.image,
    ingredients: inputs.ingredients,
    categoryId: category._id,
  };

  const submit = async () => {
    try {
      await postFood(newFood);
      fetchAllData();
      handleClose();
    } catch (error) {
      console.error("Error posting food:", error);
    }
  };

  return (
    <div className="w-full h-full fixed flex justify-center items-center left-0 top-0 z-30 bg-black/50 cursor-default text-[#09090B]">
      <div className="bg-white rounded-xl p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[16px]">
            Add new Dish to {category.categoryName}
          </p>
          <button
            className="rounded-full bg-[#F4F4F5] p-2 hover:bg-[#E4E4E7] transition duration-200 cursor-pointer"
            onClick={handleClose}
          >
            <X />
          </button>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col gap-2 w-full">
            <p className="font-medium">Food Name</p>
            <input
              type="text"
              className="px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none"
              placeholder="Type food name"
              value={inputs.foodName}
              onChange={(e) =>
                setInputs({ ...inputs, foodName: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="font-medium">Food Price</p>
            <input
              type="number"
              className="px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none"
              placeholder="Enter price..."
              value={inputs.price}
              onChange={(e) => setInputs({ ...inputs, price: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium">Ingredients</p>
          <textarea
            className="w-full px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none"
            placeholder="List ingredients..."
            rows={4}
            value={inputs.ingredients}
            onChange={(e) =>
              setInputs({ ...inputs, ingredients: e.target.value })
            }
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="font-medium">Food Image</p>
          <input
            type="text"
            className="px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none"
            placeholder="Enter image url"
            value={inputs.image}
            onChange={(e) => setInputs({ ...inputs, image: e.target.value })}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-[#18181B] text-white px-3 py-2 rounded-md cursor-pointer"
            onClick={submit}
          >
            Add Dish
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodAddModal;
