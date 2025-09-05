import { useState } from "react";
import { X } from "lucide-react";
import { patchCategory } from "@/functions/fetcherFunctions/PATCH";
import { deleteCategory } from "@/functions/fetcherFunctions/DELETE";
import { Category } from "@/types";

interface CategoryEditModalProps {
  setIsEditModalOpen: (open: boolean) => void;
  fetchAllData: () => void;
  category: Category;
}

const CategoryEditModal = ({
  setIsEditModalOpen,
  fetchAllData,
  category,
}: CategoryEditModalProps) => {
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      await patchCategory(category._id, categoryName);
      fetchAllData();
      handleClose();
    } catch (err) {
      setError("Failed to update category.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    setLoading(true);
    setError("");
    try {
      await deleteCategory(category._id);
      fetchAllData();
      handleClose();
    } catch (err) {
      setError("Failed to delete category.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsEditModalOpen(false);
    }
  };
  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 cursor-default text-[#09090B] overflow-y-auto custom-close-cursor"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl p-6 flex flex-col gap-6 max-w-lg w-full mx-4 my-8 max-h-[90vh] overflow-y-auto cursor-default">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[16px]">Edit Category</p>
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
            className="px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none"
            placeholder="Type category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            disabled={loading}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="mt-6 flex justify-between gap-4">
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer hover:bg-red-600 transition duration-200"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </button>
          <button
            className="bg-[#18181B] text-white px-3 py-2 rounded-md cursor-pointer hover:bg-[#27272A] transition duration-200"
            onClick={handleSave}
            disabled={loading || !categoryName.trim()}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryEditModal;
