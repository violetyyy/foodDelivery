import { fetchOrders } from "@/functions/fetcherFunctions/GET";
import { Order } from "@/types";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { OrderNavigation, SingleOrder } from "./index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders(setOrders);
  }, []);
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
          <div className="px-4 py-2 text-[#FAFAFA] bg-[#acacae] rounded-full">
            Change delivery state
          </div>
        </div>
      </div>
      {/* orders */}
      <OrderNavigation></OrderNavigation>
      {orders &&
        orders.map((order, index) => {
          return <SingleOrder order={order} key={index}></SingleOrder>;
        })}
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
