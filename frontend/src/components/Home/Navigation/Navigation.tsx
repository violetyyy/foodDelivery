"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex w-full justify-center items-center py-3 bg-[#18181B]">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="w-[46px]" />
          <div>
            <div className="font-semibold text-xl text-[#FAFAFA]">
              <span>Nom</span>
              <span className="text-[#EF4444]">Nom</span>
            </div>
            <p className="text-xs text-[#F4F4F5]">Swift delivery</p>
          </div>
        </div>
        <div className="flex gap-3 font-medium">
          <Link href="./auth/sign-up">
            <button
              className="px-4 py-2 text-[#18181B] bg-[#F4F4F5] rounded-full cursor-pointer 
              transition duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F4F4F5]"
            >
              Sign up
            </button>
          </Link>
          <Link href="./auth/sign-in">
            <button
              className="px-4 py-2 text-[#FAFAFA] bg-[#EF4444] rounded-full cursor-pointer 
              transition duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4444]"
            >
              Log in
            </button>
          </Link>
          <button
            className="px-4 py-2 text-[#FAFAFA] bg-[#EF4444] rounded-full cursor-pointer 
              transition duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4444]"
            onClick={() => setIsSidebarOpen(true)}
          >
            <ShoppingCart />
          </button>
        </div>
      </div>
      {isSidebarOpen && (
        <div className="w-screen h-screen fixed top-0 right-0 z-50 bg-black/50">
          <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      )}
    </div>
  );
};

export default Navigation;
