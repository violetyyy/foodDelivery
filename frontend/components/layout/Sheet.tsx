import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Food } from "@/app/(types)/page";
import { useState } from "react";
import { Plus, Minus, Trash2, CircleX } from "lucide-react";
import { useEffect } from "react";

export const SideSheet = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const {
    cartItems,
    getTotalPrice,
    getTotalItems,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const { address, setAddress } = useCart();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    console.log("Stored email from localStorage in Header:", storedEmail);
    setUserEmail(storedEmail);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="bg-white rounded-full p-2 cursor-pointer relative">
          <ShoppingCart size={16} color="black" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="bg-[#404040] p-8 overflow-x-scroll rounded-l-[20px] border-0 !max-w-[505px] overflow-hidden">
        <div className="flex text-cloude-gray gap-6 flex-col w-full h-full">
          <div className="flex gap-2">
            <ShoppingCart color="white" />
            <SheetTitle className="font-semibold text-xl text-white">
              Order detail
            </SheetTitle>
          </div>

          <div className="flex w-full rounded-full gap-2 bg-white p-1 text-[18px] leading-7">
            <div className="w-[50%] justify-center flex bg-[#EF4444] rounded-full text-white">
              Card
            </div>
            <div className="w-[50%] justify-center flex">Order</div>
          </div>

          <div className="w-full h-full rounded-[20px] bg-white p-4 flex flex-col justify-between">
            <div className="flex flex-col justify-between h-full">
              <p className="font-semibold text-xl text-muted-foreground">
                My Cart
              </p>
              <div className="flex flex-col h-[380px] overflow-y-auto">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Your cart is empty
                  </p>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.food._id}
                      className="flex items-center p-2 border-b w-full justify-between"
                    >
                      <div className="flex w-full gap-[10px]">
                        <img
                          src={item.food.image}
                          alt={item.food.foodName}
                          className="w-[124px] h-[124px] shrink-0 object-cover rounded"
                        />
                        <div className="flex flex-col w-full h-[124px] justify-between">
                          <div className="flex justify-between w-full flex-start">
                            <div>
                              <p className="text-[16px] font-bold text-[#EF4444]">
                                {item.food.foodName}
                              </p>
                              <p className="text-[12px] text-foreground">
                                {item.food.ingredients}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.food._id)}
                              className="p-1 hover:bg-gray-100 rounded text-red-500 h-fit"
                            >
                              <CircleX size={28} strokeWidth={1} />
                            </button>
                          </div>

                          <div className=" flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  item.quantity > 1 &&
                                  updateQuantity(
                                    item.food._id,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-sm font-medium w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.food._id,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <p className="text-[16px] font-bold">
                              ${item.food.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="w-full h-fit flex flex-col gap-2">
                <p className="font-semibold text-xl text-muted-foreground">
                  Delivery Location
                </p>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Please share your complete address"
                  className="h-[80px] py-2 px-3 rounded-[6px] resize-none"
                />
              </div>
            </div>
          </div>
          <div className="bg-white h-[38%] w-full flex flex-col rounded-[20px] p-4 gap-5">
            <div className="text-[20px] font-semibold text-muted-foreground">
              Payment info
            </div>
            <div className="flex justify-between">
              <div className="text-[16px] text-muted-foreground">Items</div>
              <div className="text-[16px] font-bold">
                ${getTotalPrice().toFixed(2)}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-[16px] text-muted-foreground">Shipping</div>
              <div className="text-[16px] font-bold">$0.99</div>
            </div>
            <div className=" border-t border-foreground-50 border-dashed"></div>
            <div className="flex justify-between">
              <div className="text-[16px] text-muted-foreground">Total</div>
              <div className="text-[16px] font-bold">
                ${(getTotalPrice() + 0.99).toFixed(2)}
              </div>
            </div>
            <Button
              className="w-full bg-[#EF4444] text-white rounded-[20px]"
              disabled={cartItems.length === 0}
            >
              Checkout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
