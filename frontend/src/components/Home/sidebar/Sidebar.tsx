import { useContext, useEffect, useState } from "react";
import { cartContext } from "@/context/cartContext";
import { ShoppingCart, X, Package } from "lucide-react";
import SidebarCard from "./SidebarCard";
import { postOrder } from "@/functions/fetcherFunctions/POST";
import { getUserOrders } from "@/functions/fetcherFunctions/GET";
import { CartItem, FoodOrder, Order } from "@/types";
import UserContext from "@/context/userContext";

const Sidebar = ({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}) => {
  const [isCartActive, setIsCartActive] = useState(true);
  const { cartItems, setCartItems } = useContext(cartContext);
  const { user, token, isAuthenticated } = useContext(UserContext);
  const [price, setPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  useEffect(() => {
    if (cartItems.length > 0) {
      setShippingPrice(0.99);
    } else {
      setShippingPrice(0);
    }
    const fullPrice = cartItems.reduce((acc, item: CartItem) => {
      return acc + Number(item.price) * Number(item.quantity);
    }, 0);
    setPrice(fullPrice);
  }, [cartItems]);

  const handleNavigation = () => {
    setIsCartActive(!isCartActive);
    // Load orders when switching to order tab
    if (!isCartActive && isAuthenticated && user && token) {
      loadUserOrders();
    }
  };

  const loadUserOrders = async () => {
    if (!isAuthenticated || !user || !token) return;
    
    setIsLoadingOrders(true);
    try {
      const orders = await getUserOrders(user._id, token);
      setUserOrders(orders);
    } catch (error) {
      console.error("Error loading user orders:", error);
      setUserOrders([]);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const checkout = async () => {
    if (!isAuthenticated) {
      alert("Please sign in to place an order");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!deliveryAddress.trim()) {
      alert("Please enter a delivery address");
      return;
    }

    setIsCheckoutLoading(true);

    try {
      const orderData: Partial<FoodOrder> = {
        user: user?._id || "",
        totalPrice: price + shippingPrice,
        foodOrderItems: cartItems.map((item: CartItem) => ({
          food: item._id,
          quantity: item.quantity,
        })),
        status: "PENDING",
      };

      await postOrder(orderData, token || "");
      
      // Clear cart after successful order
      setCartItems([]);
      setDeliveryAddress("");
      setCheckoutSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setCheckoutSuccess(false);
        setIsSidebarOpen(false);
      }, 3000);

    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsCheckoutLoading(false);
    }
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
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2  h-20 text-lg text-[#71717A] flex align-text-top focus:outline-none"
            />
          </div>
        </div>
      ) : (
        <div className="w-full bg-white p-4 rounded-[20px] flex flex-col gap-4 h-full overflow-y-scroll">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-red-500" />
            <p className="text-xl font-semibold text-[#71717A]">My Orders</p>
          </div>
          
          {!isAuthenticated ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Package className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-lg font-semibold text-gray-600 mb-2">Sign in to view orders</p>
              <p className="text-sm text-gray-500">Please sign in to see your order history</p>
            </div>
          ) : isLoadingOrders ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">Loading orders...</div>
            </div>
          ) : userOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Package className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-lg font-semibold text-gray-600 mb-2">No orders yet</p>
              <p className="text-sm text-gray-500">Your order history will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {userOrders.map((order, index) => (
                <div key={order._id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">Order #{index + 1}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-500">${order.totalPrice.toFixed(2)}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{order.foodOrderItems.length} item(s)</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {order.user?.address || 'No address provided'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
        {checkoutSuccess ? (
          <div className="px-8 py-2 bg-green-500 rounded-full text-[#FAFAFA] text-center">
            Order placed successfully! 🎉
          </div>
        ) : (
          <button
            className={`px-8 py-2 rounded-full text-[#FAFAFA] cursor-pointer ${
              isCheckoutLoading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={checkout}
            disabled={isCheckoutLoading}
          >
            {isCheckoutLoading ? "Processing..." : "Checkout"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
