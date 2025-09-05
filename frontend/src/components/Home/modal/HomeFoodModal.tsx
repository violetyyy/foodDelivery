import { cartContext } from "@/context/cartContext";
import { Food, CartItem } from "@/types";
import { Minus, Plus, X } from "lucide-react";
import { useContext, useState } from "react";

export const HomeFoodModal = ({
  food,
  setIsModalOpen,
  setIsAddedToCart,
}: {
  food: Food;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setIsAddedToCart: (isAddedToCart: boolean) => void;
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(cartContext);

  const handleAddToCart = (food: Food, quantity: number) => {
    const cartItem: CartItem = {
      _id: food._id,
      foodName: food.foodName,
      price: food.price,
      image: food.image,
      ingredients: food.ingredients,
      quantity: quantity,
      category: food.category,
    };
    
    addToCart(cartItem);
    setIsModalOpen(false);
    setIsAddedToCart(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };

  // Modal backdrop дээр дарахад хаах функц
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 custom-close-cursor text-[#09090B] overflow-y-auto transition-all duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl p-6 flex gap-6 w-full mx-4 my-8 max-w-xl overflow-y-auto min-h-[300px] cursor-default">
        <img
          src={food.image}
          alt={food.foodName}
          className="w-62 h-62 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex flex-col gap-10 justify-between w-full">
          <div className="flex flex-col items-end w-full">
            <div
              className="rounded-full bg-[#F4F4F5] p-2 hover:bg-[#E4E4E7] transition duration-200 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              <X />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <p className="text-3xl font-semibold text-red-500">
                {food.foodName}
              </p>
              <p className="text-base text-[#09090B]">{food.ingredients}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <p>Total price</p>
                <p className="text-2xl font-semibold text-[#09090B]">
                  ${(Number(food.price) * quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={`p-2 rounded-full border cursor-pointer ${
                    quantity > 1 ? "" : "border-[#E4E4E7]"
                  }`}
                  onClick={() =>
                    setQuantity(quantity > 1 ? quantity - 1 : quantity)
                  }
                >
                  <Minus />
                </button>
                <p className="text-lg font-semibold">{quantity}</p>
                <button
                  className="p-2 rounded-full border cursor-pointer"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus />
                </button>
              </div>
            </div>
            <button
              className="bg-[#18181B] text-white px-4 py-2 rounded-full w-full cursor-pointer"
              onClick={() => handleAddToCart(food, quantity)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
