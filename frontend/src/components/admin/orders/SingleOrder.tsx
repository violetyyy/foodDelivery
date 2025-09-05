import { Order } from "@/types";
import { ArrowDownUp } from "lucide-react";

export const SingleOrder = ({ order }: { order: Order }) => {
  return (
    <div className="flex p-4 gap-8 items-center border border-[#E4E4E7] bg-white hover:bg-[#F4F4F5] transition-colors duration-200 cursor-pointer">
      <input type="checkbox" name="" id="" />
      <p>1</p>
      <p className="min-w-[250px]">{order?.user?.email}</p>
      <p className="min-w-[160px]">{order?.foodOrderItems.length} foods</p>
      <div className="min-w-[120px] flex items-center justify-between">
        <p>{order?.createdAt}</p>
        <ArrowDownUp size={16} />
      </div>
      <p className="min-w-[160px]">${order?.totalPrice}</p>
      <p className="w-full">{order?.user?.address}</p>
      <p className="min-w-[160px]">{order?.status}</p>
    </div>
  );
};
