import { Order } from "@/app/(types)/page";
import { url } from "@/utils/url";
import { SetStateAction } from "react";

export const fetchOrders = async (setOrders: {
  (value: SetStateAction<Order[]>): void;
  (arg0: any): void;
}) => {
  try {
    const response = await fetch(`${url}food-order`);
    const responseData = await response.json();
    setOrders(responseData.data);
  } catch (error) {
    console.log(error);
  }
};
