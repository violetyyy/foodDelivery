import { ArrowDownUp } from "lucide-react";

export const OrderNavigation = () => {
  return (
    <div className="flex p-4 gap-8 items-center border border-[#E4E4E7] bg-alpha-50 ">
      <input type="checkbox" name="" id="" />
      <p>№</p>
      <p className="min-w-[250px]">Customer</p>
      <p className="min-w-[160px]">Food</p>
      <div className="min-w-[120px] flex items-center justify-between">
        <p>Date</p>
        <ArrowDownUp size={16} />
      </div>
      <p className="min-w-[160px]">Total</p>
      <p className="w-full">Delivery Address</p>
      <p className="min-w-[160px]">Delivery State</p>
    </div>
  );
};
