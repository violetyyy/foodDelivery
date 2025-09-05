import { fetchOrders } from "@/functions/fetcherFunctions/GET";
import { Order } from "@/types";
import { Calendar } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { OrderNavigation, SingleOrder } from "./index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "@/context/userContext";
import OrderStatusModal from "../modals/OrderStatusModal";

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { token, isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated && token) {
      setIsLoading(true);
      fetchOrders(setOrders, token).finally(() => setIsLoading(false));
    }
  }, [isAuthenticated, token]);

  const fetchAllData = () => {
    if (isAuthenticated && token) {
      fetchOrders(setOrders, token);
    }
  };

  const handleChangeDeliveryState = () => {
    if (orders.length === 0) {
      toast.warning("No orders available to update");
      return;
    }
    
    // For now, let's open the modal with the first order
    // In a real implementation, you might want to select multiple orders
    setSelectedOrder(orders[0]);
    setIsStatusModalOpen(true);
  };

  const handleOrderStatusClick = (order: Order) => {
    setSelectedOrder(order);
    setIsStatusModalOpen(true);
  };
  return (
    <div className="p-6 bg-white rounded-xl flex flex-col gap-4 shadow-md animate-fadeIn">
      <div className="p-4 flex justify-between items-center bg-white rounded-t-lg">
        <div>
          <p className="text-[#09090B] font-bold text-xl">Orders</p>
          <p className="text-xs font-semibold text-[#71717A]">
            {orders.length} items
          </p>
        </div>
        <div className="gap-3 flex items-center">
          <div className="rounded-full border border-[#E4E4E7] flex items-center px-4 py-2 gap-2 ">
            <Calendar size={16} />
            <p>13 June 2023 - 14 July 2023</p>
          </div>
          <button
            className="px-4 py-2 text-[#FAFAFA] bg-[#EF4444] rounded-full hover:bg-[#DC2626] transition duration-200 cursor-pointer disabled:bg-[#acacae] disabled:cursor-not-allowed"
            onClick={handleChangeDeliveryState}
            disabled={orders.length === 0}
          >
            Change delivery state
          </button>
        </div>
      </div>
      {/* orders */}
      <OrderNavigation></OrderNavigation>
      {!isAuthenticated ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-semibold text-gray-600 mb-2">Authentication Required</p>
          <p className="text-sm text-gray-500">Please sign in to view orders</p>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading orders...</div>
        </div>
      ) : orders && orders.length > 0 ? (
        orders.map((order, index) => {
          return <SingleOrder order={order} key={index} onStatusClick={handleOrderStatusClick}></SingleOrder>;
        })
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-semibold text-gray-600 mb-2">No orders found</p>
          <p className="text-sm text-gray-500">Orders will appear here when customers place them</p>
        </div>
      )}
      
      {/* Order Status Modal */}
      {isStatusModalOpen && selectedOrder && (
        <OrderStatusModal
          setIsModalOpen={setIsStatusModalOpen}
          order={selectedOrder}
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
