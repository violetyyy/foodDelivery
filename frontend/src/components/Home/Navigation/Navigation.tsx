"use client";
import Link from "next/link";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useState, useContext } from "react";
import Sidebar from "../sidebar/Sidebar";
import UserContext from "@/context/userContext";
import { cartContext } from "@/context/cartContext";

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isAuthenticated, logout } = useContext(UserContext);
  const { cartItems } = useContext(cartContext);
  
  // Calculate total items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
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
        <div className="flex gap-3 font-medium items-center">
          {isAuthenticated ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-2 text-[#FAFAFA]">
                <User className="w-5 h-5" />
                <span className="text-sm">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={logout}
                className="px-4 py-2 text-[#FAFAFA] bg-[#EF4444] rounded-full cursor-pointer 
                transition duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4444] flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Sign Up Button */}
              <Link href="/sign-up">
                <button
                  className="px-4 py-2 text-[#18181B] bg-[#F4F4F5] rounded-full cursor-pointer 
                  transition duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F4F4F5]"
                >
                  Sign up
                </button>
              </Link>
              
              {/* Sign In Button */}
              <Link href="/sign-in">
                <button
                  className="px-4 py-2 text-[#FAFAFA] bg-[#EF4444] rounded-full cursor-pointer 
                  transition duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4444]"
                >
                  Log in
                </button>
              </Link>
            </>
          )}
          
          {/* Cart Button */}
          <button
            className="relative px-4 py-2 text-[#FAFAFA] bg-[#EF4444] rounded-full cursor-pointer 
              transition duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4444]"
            onClick={() => setIsSidebarOpen(true)}
          >
            <ShoppingCart />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-red-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
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
