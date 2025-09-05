import { useState } from "react";
import { X } from "lucide-react";
import { patchOrder } from "@/functions/fetcherFunctions/PATCH";

interface OrderStatusModalProps {
  setIsModalOpen: (open: boolean) => void;
  order: any;
  fetchAllData: () => void;
}

const OrderStatusModal = ({
  setIsModalOpen,
  order,
  fetchAllData,
}: OrderStatusModalProps) => {
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [isLoading, setIsLoading] = useState(false);

  const statusOptions = [
    { value: "PENDING", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { value: "DELIVERED", label: "Delivered", color: "bg-green-100 text-green-800" },
    { value: "CANCELED", label: "Canceled", color: "bg-red-100 text-red-800" },
  ];

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    if (selectedStatus === order.status) {
      handleClose();
      return;
    }

    setIsLoading(true);
    try {
      await patchOrder(order._id, { status: selectedStatus });
      fetchAllData();
      handleClose();
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <div
      className="w-full h-full fixed flex justify-center items-center left-0 top-0 z-30 bg-black/50 cursor-default text-[#09090B] custom-close-cursor"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl p-6 flex flex-col gap-6 min-w-lg cursor-default">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[16px]">Change Order Status</p>
          <button
            className="rounded-full bg-[#F4F4F5] p-2 hover:bg-[#E4E4E7] transition duration-200 cursor-pointer"
            onClick={handleClose}
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm text-[#71717A]">Order #{order._id.slice(-6)}</p>
          <p className="text-sm text-[#71717A]">Customer: {order.user?.email}</p>
          <p className="text-sm text-[#71717A]">Total: ${order.totalPrice}</p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-[#71717A]">Select New Status:</p>
          <div className="flex flex-col gap-3">
            {statusOptions.map((status) => (
              <label
                key={status.value}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition duration-200 ${
                  selectedStatus === status.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value={status.value}
                  checked={selectedStatus === status.value}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                  {status.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition duration-200"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-md cursor-pointer transition duration-200 flex items-center gap-2 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Updating...
              </>
            ) : (
              "Update Status"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusModal;