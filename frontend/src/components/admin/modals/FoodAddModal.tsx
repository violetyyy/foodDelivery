import { postFood } from "@/functions/fetcherFunctions/POST";
import { Category } from "@/types";
import { X, Image, Upload } from "lucide-react";
import { useState, useRef } from "react";

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
    quantity: 0,
  });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const submit = async () => {
    setLoading(true);
    try {
      // Create the newFood object inside the submit function
      const newFood = {
        foodName: inputs.foodName,
        price: parseFloat(inputs.price), // Convert string to number
        image: inputs.image,
        ingredients: inputs.ingredients,
        quantity: inputs.quantity,
        category: category._id, // Use 'category' field name as expected by backend
      };
      await postFood(newFood);
      fetchAllData();
      handleClose();
    } catch (error) {
      console.error("Error posting food:", error);
    } finally {
      setLoading(false);
    }
  };

  const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new window.Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      try {
        const compressedImage = await compressImage(file);
        setInputs((prevInputs) => ({ ...prevInputs, image: compressedImage }));
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('Error processing image. Please try again.');
      }
    }
  };

  const handleClear = () => {
    setInputs((prevInputs) => ({ ...prevInputs, image: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };
  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 cursor-default text-[#09090B] overflow-y-auto custom-close-cursor"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl p-6 flex flex-col gap-6 max-w-lg w-full mx-4 my-8 max-h-[90vh] overflow-y-auto cursor-default">
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
                setInputs((prevInputs) => ({
                  ...prevInputs,
                  foodName: e.target.value,
                }))
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
              onChange={(e) =>
                setInputs((prevInputs) => ({
                  ...prevInputs,
                  price: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium">Quantity</p>
          <input
            type="number"
            className="px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none"
            placeholder="Enter quantity..."
            value={inputs.quantity}
            onChange={(e) =>
              setInputs((prevInputs) => ({
                ...prevInputs,
                quantity: parseInt(e.target.value) || 0,
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium">Ingredients</p>
          <textarea
            className="w-full px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none"
            placeholder="List ingredients..."
            rows={4}
            value={inputs.ingredients}
            onChange={(e) =>
              setInputs((prevInputs) => ({
                ...prevInputs,
                ingredients: e.target.value,
              }))
            }
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="font-medium">Food Image</p>

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
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div
                  onClick={handleUploadClick}
                  className="flex flex-col justify-center items-center gap-2 px-3 border border-[#2563eb33] rounded-md cursor-pointer bg-[#2563eb0d] border-dashed transition duration-200 py-10 hover:bg-[#2563eb1a]"
                >
                  <div className="rounded-full bg-white p-2">
                    <Image />
                  </div>
                  <p className="font-medium">
                    Choose a file or drag & drop it here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-[#18181B] text-white px-3 py-2 rounded-md cursor-pointer hover:bg-[#27272A] transition duration-200 flex items-center min-w-[100px] justify-center disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-400"
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
              "Add Dish"
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

export default FoodAddModal;
