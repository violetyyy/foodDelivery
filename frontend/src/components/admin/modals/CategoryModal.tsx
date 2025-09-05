import { postCategory } from "@/functions/fetcherFunctions/POST";
import { X } from "lucide-react";
import { useState } from "react";

interface CategoryModalProps {
  setIsAddModalOpen: (open: boolean) => void;
  fetchAllData: () => void; // Add this prop
}

const CategoryModal = ({
  setIsAddModalOpen,
  fetchAllData,
}: CategoryModalProps) => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setIsAddModalOpen(false);
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      await postCategory({ categoryName });
      fetchAllData();
      handleClose();
    } catch (error) {
      console.error("Error adding category:", error);
      // Optionally handle error visually
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 cursor-default text-[#09090B] overflow-y-auto">
      <div className="bg-white rounded-xl p-6 flex flex-col gap-6 max-w-lg w-full mx-4 my-8 max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[16px]">Add Category</p>
          <button
            className="rounded-full bg-[#F4F4F5] p-2 hover:bg-[#E4E4E7] transition duration-200 cursor-pointer"
            onClick={handleClose}
            disabled={loading}
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="font-medium">Category Name</p>
          <input
            type="text"
            className="px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none focus:border-blue-500 transition duration-150 hover:border-blue-300 shadow-sm"
            placeholder="Type category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-[#18181B] text-white px-3 py-2 rounded-md cursor-pointer hover:bg-[#27272A] transition duration-200 flex items-center min-w-[100px] justify-center disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-400"
            onClick={handleAdd}
            disabled={loading || !categoryName.trim()}
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
              "Add Category"
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

export default CategoryModal;
