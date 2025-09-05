import { Order } from "@/types";
import { ArrowDownUp } from "lucide-react";

interface SingleOrderProps {
  order: Order;
  onStatusClick?: (order: Order) => void;
}

export const SingleOrder = ({ order, onStatusClick }: SingleOrderProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex p-4 gap-8 items-center border border-[#E4E4E7] bg-white hover:bg-[#F4F4F5] transition-colors duration-200">
      <input type="checkbox" name="" id="" />
      <p>1</p>
      <p className="min-w-[250px]">{order?.user?.email}</p>
      <p className="min-w-[160px]">{order?.foodOrderItems.length} foods</p>
      <div className="min-w-[120px] flex items-center justify-between">
        <p>{new Date(order?.createdAt).toLocaleDateString()}</p>
        <ArrowDownUp size={16} />
      </div>
      <p className="min-w-[160px]">${order?.totalPrice}</p>
      <p className="w-full">{order?.user?.address}</p>
      <button
        className={`min-w-[160px] px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:opacity-80 transition duration-200 ${getStatusColor(order?.status)}`}
        onClick={() => onStatusClick?.(order)}
        title="Click to change status"
      >
        {order?.status}
      </button>
    </div>
  );
};
