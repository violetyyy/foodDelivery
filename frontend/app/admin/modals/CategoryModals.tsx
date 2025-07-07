import { postCategory } from "@/functions/Post";
import { X } from "lucide-react";
import { useState } from "react";

interface CategoryModalProps {
  setIsModalOpen: (open: boolean) => void;
  fetchAllData: () => void; // Add this prop
}

const CategoryModal = ({
  setIsModalOpen,
  fetchAllData,
}: CategoryModalProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const [categoryName, setCategoryName] = useState("");
  const submit = async () => {
    try {
      await postCategory(categoryName);
      fetchAllData(); // Refresh the data after successful post
      handleClose();
    } catch (error) {
      console.error("Error posting category:", error);
      // Handle error as needed
    }
  };
  return (
    <div className="w-full h-full fixed flex justify-center items-center left-0 top-0 z-30 bg-black/50 cursor-default text-[#09090B]">
      <div className="bg-white rounded-xl p-6 flex flex-col gap-8 min-w-lg">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Add new Category</p>
          <button
            className="rounded-full bg-[#F4F4F5] p-2 hover:bg-[#E4E4E7] transition duration-200 cursor-pointer"
            onClick={handleClose}
          >
            <X />
          </button>
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="font-medium">Category Name</p>
          <input
            type="text"
            className="px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none"
            placeholder="Type category name..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className=" flex justify-end">
          <button
            className="bg-[#18181B] text-white px-3 py-2 rounded-md cursor-pointer"
            onClick={submit}
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};
export default CategoryModal;
