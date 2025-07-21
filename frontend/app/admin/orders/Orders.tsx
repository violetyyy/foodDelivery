"use client";
import { fetchOrders } from "@/functions/Get";
import { Order } from "@/app/(types)/page";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { OrderNavigation } from "./OrderNavigation";
import { SingleOrder } from "./SingleOrder";

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders(setOrders);
  }, []);
  return (
    <div className="rounded-lg ">
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
      <OrderNavigation></OrderNavigation>
      {orders &&
        orders.map((order, index) => {
          return <SingleOrder order={order} key={index}></SingleOrder>;
        })}
    </div>
  );
};
