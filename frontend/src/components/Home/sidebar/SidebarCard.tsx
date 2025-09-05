import { CartItem } from "@/types";
import { useContext, useState, useEffect } from "react";
import { Minus, Plus, X } from "lucide-react";
import { cartContext } from "@/context/cartContext";

const SidebarCard = ({ food }: { food: CartItem }) => {
  const [quantity, setQuantity] = useState(food.quantity);
  const { updateQuantity, removeFromCart } = useContext(cartContext);

  // Update local quantity when food quantity changes
  useEffect(() => {
    setQuantity(food.quantity);
  }, [food.quantity]);

  // const editCartItems = (food: Food, quantity: number) => {
  //   const updatedCart = cartItems.map((item) => {
  //     if (item._id === food._id) {
  //       return { ...item, quantity };
  //     }
  //     return item;
  //   });

  //   setCartItems(updatedCart);
  // };

  return (
    <div className="flex  gap-2.5 items-center">
      <img
        src={food.image}
        alt={food.foodName}
        className="w-35 h-30 rounded-xl"
      />
      <div className="w-full flex flex-col gap-6">
        <div className="flex gap-2.5">
          <div className="flex justify-between w-full gap-2.5 items-center">
            <div className="flex flex-col gap-2">
              <p className="text-red-500 text-base font-bold">
                {food.foodName}
              </p>
              <p className="text-gray-500 text-sm">{food.ingredients}</p>
            </div>
            <button
              className="size-9 flex justify-center items-center border border-red-500 rounded-full p-2 hover:bg-red-500 hover:text-white transition duration-200 cursor-pointer text-red-500"
              onClick={() => {
                removeFromCart(food._id);
              }}
            >
              <X />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <Minus
              onClick={() => {
                if (quantity > 1) {
                  const newQuantity = quantity - 1;
                  setQuantity(newQuantity);
                  updateQuantity(food._id, newQuantity);
                }
              }}
              className="cursor-pointer"
            />
            <p>{quantity}</p>
            <Plus
              onClick={() => {
                const newQuantity = quantity + 1;
                setQuantity(newQuantity);
                updateQuantity(food._id, newQuantity);
              }}
              className="cursor-pointer"
            />
          </div>
          <div className="text-2xl font-semibold text-[#09090B]">
            ${(Number(food.price) * quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarCard;
