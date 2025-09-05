import { deleteFood } from "@/functions/fetcherFunctions/DELETE";
import { fetchCategories } from "@/functions/fetcherFunctions/GET";
import { patchFood } from "@/functions/fetcherFunctions/PATCH";
import { Category, Food } from "@/types";
import { Trash, X, Image } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

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
  const [loading, setLoading] = useState(false);

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
    if (!window.confirm("Are you sure you want to delete this dish?")) return;
    setLoading(true);
    try {
      await deleteFood(food._id);
      fetchAllData();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    setLoading(true);
    try {
      // Find the selected category object to get its ID
      const selectedCategory = categories.find(
        (cat) => cat.categoryName === inputs.category
      );

      const updatedFood: Food = {
        _id: food._id,
        foodName: inputs.foodName,
        price: inputs.price,
        image: inputs.image,
        ingredients: inputs.ingredients,
        // Use the category ID, not the name
        category: {
          _id: selectedCategory?._id || food.category._id,
          categoryName: inputs.category,
        },
      };

      await patchFood(food._id, updatedFood);
      setIsModalOpen(false);
      fetchAllData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (result: any) => {
    if (result?.info?.secure_url) {
      setInputs({ ...inputs, image: result.info.secure_url });
    }
  };

  const handleClear = () => {
    setInputs({ ...inputs, image: "" });
  };

  const handleCategoryClick = (category: string) => {
    setInputs({ ...inputs, category: category });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };
  return (
    <div
      className="w-full h-full fixed flex justify-center items-center left-0 top-0 z-30 bg-black/50 cursor-default text-[#09090B] custom-close-cursor"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl p-6 flex flex-col gap-6 min-w-lg cursor-default">
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
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full border border-[#E4E4E7] rounded-md px-1 py-2 focus:outline-none">
              {inputs.category}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full z-20 bg-white p-5 rounded-md flex flex-col gap-2 border border-[#E4E4E7]">
              {categories.map((category) => {
                return (
                  <div
                    className="flex flex-col gap-1 hover:bg-[#f4f4f5] cursor-pointer rounded-md w-[300px] px-3 py-2"
                    key={category._id}
                    onClick={() => {
                      handleCategoryClick(category.categoryName);
                    }}
                  >
                    <DropdownMenuItem className="w-full focus:outline-0">
                      {category.categoryName}
                    </DropdownMenuItem>
                  </div>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
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
          <div className="w-full">
            {inputs.image ? (
              <div
                className="relative w-full h-48 rounded-lg overflow-hidden border border-[#E4E4E7] p-2 justify-end flex"
                style={{
                  background: `url(${inputs.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <button
                  className="p-2 rounded-full bg-white h-fit cursor-pointer hover:bg-[#dcdbdb] duration-200"
                  onClick={handleClear}
                >
                  <X />
                </button>
              </div>
            ) : (
              <CldUploadButton
                uploadPreset="food-delivery"
                onSuccess={handleImageUpload}
                className="w-full"
              >
                <div className="flex flex-col justify-center items-center gap-2 px-3 border border-[#2563eb33] rounded-md cursor-pointer bg-[#2563eb0d] border-dashed transition duration-200 py-10 hover:bg-[#2563eb1a]">
                  <div className="rounded-full bg-white p-2">
                    <Image />
                  </div>
                  <p className="font-medium">
                    Choose a file or drag & drop it here
                  </p>
                </div>
              </CldUploadButton>
            )}
          </div>
        </div>
        <div className="flex justify-between gap-4 mt-6">
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer hover:bg-red-600 transition duration-200 flex items-center min-w-[90px] justify-center disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-red-400"
            onClick={delFood}
            disabled={loading}
          >
            {loading ? (
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
            ) : (
              "Delete"
            )}
          </button>
          <button
            className="bg-[#18181B] text-white px-3 py-2 rounded-md cursor-pointer hover:bg-[#27272A] transition duration-200 flex items-center min-w-[90px] justify-center disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-400"
            onClick={submit}
            disabled={loading}
          >
            {loading ? (
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
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
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

export default FoodEditModal;
