import { useContext, useEffect, useState } from "react";
import { cartContext } from "@/context/cartContext";
import { ShoppingCart, X } from "lucide-react";
import SidebarCard from "./SidebarCard";
import { postOrder } from "@/functions/fetcherFunctions/POST/postOrder";

const Sidebar = ({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}) => {
  const [isCartActive, setIsCartActive] = useState(true);
  const { cartItems } = useContext(cartContext);
  const [price, setPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);

  useEffect(() => {
    if (cartItems.length > 0) {
      setShippingPrice(0.99);
    } else {
      setShippingPrice(0);
    }
    const fullPrice = cartItems.reduce((acc, item) => {
      return acc + Number(item.price) * Number(item.quantity);
    }, 0);
    setPrice(fullPrice);
  }, [cartItems]);

  const handleNavigation = () => {
    setIsCartActive(!isCartActive);
  };
  const checkout = () => {
    const order = {};
  };
  // const { foodId, totalPrice, status, userId } = req.body;
  return (
    <div className="fixed top-0 right-0 w-2/6 h-full bg-[#303030] rounded-l-xl z-50 gap-6 flex flex-col p-8 shadow-2xl">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-2 text-white">
          <ShoppingCart className="w-6 h-6" />
          <h1 className="text-xl font-semibold">Order Details</h1>
        </div>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-white border rounded-full border-white p-2 hover:bg-white hover:text-[#404040] transition duration-200 cursor-pointer"
        >
          <X />
        </button>
      </div>
      <div className="w-full flex justify-between items-center bg-white rounded-full p-1 gap-2">
        <button
          className={`w-full  rounded-full p-2 cursor-pointer duration-200 ${
            isCartActive
              ? "bg-red-500 text-white"
              : "hover:bg-red-500 hover:text-white"
          } `}
          onClick={() => {
            handleNavigation();
          }}
        >
          Cart
        </button>
        <button
          className={`w-full  rounded-full p-2 cursor-pointer duration-200 ${
            !isCartActive
              ? "bg-red-500 text-white"
              : "hover:bg-red-500 hover:text-white"
          } `}
          onClick={() => {
            handleNavigation();
          }}
        >
          Order
        </button>
      </div>
      {isCartActive ? (
        <div className="w-full bg-white  p-4 rounded-[20px] flex flex-col gap-4 h-full ">
          <p className="text-xl font-semibold text-[#71717A]">My Cart</p>
          <div className="overflow-y-scroll scrollbar-hide h-13/15 ">
            {cartItems.length > 0 ? (
              <div className="flex flex-col gap-4">
                {cartItems.map((food) => (
                  <SidebarCard key={food._id} food={food} />
                ))}
              </div>
            ) : (
              <div className="w-full h-fit px-12 py-8 flex flex-col gap-1 bg-[#F4F4F5] text-center rounded-[20px] items-center">
                <img src="/logo.png" alt="logo" className="w-[50px]" />
                <p className="text-base font-bold  text-[#09090B]">
                  Your cart is empthy
                </p>
                <p className="text-xs text-[#71717A]">
                  Hungry? 🍔 Add some delicious dishes to your cart and satisfy
                  your cravings!
                </p>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="text-xl font-semibold text-[#71717A]">
              Delivery Address
            </p>
            <input
              type="text"
              placeholder="Enter your delivery address"
              className="w-full border border-gray-300 rounded-xl px-3 py-2  h-20 text-lg text-[#71717A] flex align-text-top focus:outline-none"
            />
          </div>
        </div>
      ) : (
        <div className="w-full bg-white  p-4 rounded-[20px] flex flex-col gap-4 h-full overflow-y-scroll"></div>
      )}
      <div className="w-full h-fit bg-white rounded-[20px] p-4 flex flex-col gap-5">
        <p className="text-xl font-semibold text-[#71717A]">Payment info</p>
        <div className="flex flex-col gap-2 text-base">
          <div className="w-full flex justify-between">
            <p className="text-[#71717A]">Items </p>
            <p className="font-bold text-[#09090B] ">
              {Number(price).toFixed(2)}$
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p className="text-[#71717A]">Shipping </p>
            <p className="font-bold text-[#09090B] ">{shippingPrice}$</p>
          </div>
        </div>
        <div className="w-full border border-dashed border-[#09090b]"></div>
        <div className="w-full flex justify-between">
          <p className="text-[#71717A]">Total</p>
          <p className="font-bold text-[#09090B] ">
            {(price + shippingPrice).toFixed(2)}$
          </p>
        </div>
        <button
          className="px-8 py-2 bg-red-500 rounded-full text-[#FAFAFA] cursor-pointer"
          onClick={() => {
            checkout();
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
