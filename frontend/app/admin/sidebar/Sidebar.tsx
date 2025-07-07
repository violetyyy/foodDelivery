"use client";
import { LayoutDashboard, Truck } from "lucide-react";
import Link from "next/link";

const SideBar = ({ page }: { page: String }) => {
  return (
    <div className="fixed left-0 top-0 flex flex-col items-center min-h-screen py-9 px-5 bg-white gap-10 w-fit z-10">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="logo" className="w-[46px]" />
        <div>
          <p className="font-semibold text-lg text-[#09090B]">NomNom</p>
          <p className="text-xs text-[#71717A]">Swift delivery</p>
        </div>
      </div>
      <div className="font-medium flex flex-col gap-6">
        {page === "Menu" ? (
          <div className="flex flex-col gap-6">
            <button
              className={`px-6 py-2 flex gap-2.5 text-[#FAFAFA] bg-[#18181B] rounded-full transition-colors duration-200`}
            >
              <LayoutDashboard />
              <p>Food Menu</p>
            </button>
            <Link href={"/admin/orders"} className="w-full">
              <button className="px-6 py-2 w-full flex gap-2.5 hover:text-[#FAFAFA] hover:bg-[#18181B] rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap">
                <Truck />
                <p>Orders</p>
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <Link href={"/admin"} className="w-full">
              <button
                className={`px-6 py-2 flex gap-2.5 hover:text-[#FAFAFA] hover:bg-[#18181B] cursor-pointer rounded-full transition-colors duration-200 whitespace-nowrap`}
              >
                <LayoutDashboard />
                <p>Food Menu</p>
              </button>
            </Link>
            <button className="px-6 py-2 w-full flex gap-2.5 text-[#FAFAFA] bg-[#18181B] rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap">
              <Truck />
              <p>Orders</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
