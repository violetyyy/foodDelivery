"use client";

import { Plus } from "lucide-react";

import { useState } from "react";
import CategoryModal from "../modals/CategoryModal";
import CategoryEditModal from "../modals/CategoryEditModal";
import { Category, Food } from "@/types";

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

interface CategoryProps {
  categories: Category[];
  foods: Food[];
  fetchAllData: () => void;
}
const AdminCategory = ({ categories, foods, fetchAllData }: CategoryProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [addLoading, setAddLoading] = useState(false);

  return (
    <div className="p-6 bg-white rounded-xl flex flex-col gap-4 shadow-md animate-fadeIn">
      <p className="text-xl font-semibold">Dishes Category</p>
      <div className="flex gap-3 text-[#18181B] font-medium">
        <div className="px-4 py-2 flex gap-2 items-center rounded-full border border-[#E4E4E7] text-[#09090B] font-medium cursor-pointer hover:shadow-md hover:bg-[#f4f4f5] transition duration-150 focus:ring-2 focus:ring-blue-400">
          <p>All Dishes</p>
          <div className="px-2.5 py-0.5 text-[#FAFAFA] text-xs font-semibold bg-[#18181B] rounded-full">
            {foods && foods?.length}
          </div>
        </div>
        <div className="flex gap-3 text-[#18181B] font-medium">
          {categories &&
            categories?.map((category, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-full items-center border border-[#E4E4E7] text-[#09090B] font-medium cursor-pointer flex gap-2 hover:shadow-md hover:bg-[#f4f4f5] transition duration-150 focus:ring-2 focus:ring-blue-400"
                onClick={() => {
                  setSelectedCategory(category);
                  setIsEditModalOpen(true);
                }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSelectedCategory(category);
                    setIsEditModalOpen(true);
                  }
                }}
              >
                <p>{category.categoryName}</p>
                <div className="px-2.5 py-0.5 text-[#FAFAFA] text-xs font-semibold bg-[#18181B] rounded-full">
                  {foods &&
                    foods.filter(
                      (food) =>
                        food?.category?.categoryName === category?.categoryName
                    ).length}
                </div>
              </div>
            ))}
          <div
            className="rounded-full bg-red-500 hover:bg-red-600 flex justify-center items-center size-[40px] transition cursor-pointer duration-200 shadow-md focus:ring-2 focus:ring-red-400"
            onClick={() => {
              setAddLoading(true);
              setIsAddModalOpen(true);
              setTimeout(() => setAddLoading(false), 500); // fake loader for polish
            }}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setAddLoading(true);
                setIsAddModalOpen(true);
                setTimeout(() => setAddLoading(false), 500);
              }
            }}
          >
            {addLoading ? <Loader /> : <Plus size={16} color="white" />}
          </div>
        </div>
      </div>
      {isEditModalOpen && selectedCategory && (
        <CategoryEditModal
          setIsEditModalOpen={setIsEditModalOpen}
          fetchAllData={fetchAllData}
          category={selectedCategory}
        />
      )}
      {isAddModalOpen && (
        <CategoryModal
          setIsAddModalOpen={setIsAddModalOpen}
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

export default AdminCategory;
