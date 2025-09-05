import { Food } from "@/types";
import { Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import FoodEditModal from "../modals/FoodEditModal";
import { deleteFood } from "@/functions/fetcherFunctions/DELETE";

export const AdminFoodCard = ({
  food,
  fetchAllData,
}: {
  food: Food;
  fetchAllData: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${food.foodName}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteFood(food._id);
      fetchAllData(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting food:", error);
      alert("Failed to delete food. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 rounded-[20px] border border-[#E4E4E7] flex flex-col gap-5 bg-white shadow-md hover:shadow-lg transition duration-200 animate-fadeIn">
      <div
        className="w-full h-[210px] bg-center bg-cover rounded-xl p-5 flex justify-between items-end "
        style={{ backgroundImage: `url(${food.image})` }}
      >
        {/* Delete Button */}
        <button
          className="bg-white rounded-full p-3 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer focus:ring-2 focus:ring-red-400 transition duration-150 shadow-md"
          onClick={handleDelete}
          disabled={isDeleting}
          title="Delete food item"
        >
          {isDeleting ? (
            <svg
              className="animate-spin h-5 w-5 text-red-500"
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
            <Trash2 size={20} />
          )}
        </button>

        {/* Edit Button */}
        <button
          className="bg-white rounded-full p-3 text-blue-500 hover:bg-blue-50 hover:text-blue-600 cursor-pointer focus:ring-2 focus:ring-blue-400 transition duration-150 shadow-md"
          onClick={() => setIsModalOpen(true)}
          title="Edit food item"
        >
          <Pen size={20} />
        </button>
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
