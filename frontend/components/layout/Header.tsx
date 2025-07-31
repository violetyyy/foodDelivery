"use client";

import { useEffect, useState } from "react";
import { ChevronRight, MapPin, User } from "lucide-react";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useCart } from "@/contexts/CartContext";
import { SideSheet } from "./Sheet";

export const Header = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { address } = useCart();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    console.log("Stored email from localStorage in Header:", storedEmail);
    setUserEmail(storedEmail);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUserEmail(null);
  };

  return (
    <div className="bg-[#18181B] py-[12px] px-[88px] flex justify-between items-center fixed top-0 w-screen z-50">
      <div className="flex gap-3">
        <img src="/logo.svg" alt="logo" />
        <div className="flex flex-col">
          <div className="flex">
            <p className="text-white text-[20px] font-semibold">Nom</p>
            <p className="text-[#EF4444] text-[20px] font-semibold">Nom</p>
          </div>
          <p className="text-white text-[12px] font-normal">Swift delivery</p>
        </div>
      </div>

      {userEmail ? (
        <div className="flex gap-3 items-center">
          <button className="bg-white rounded-full gap-3 cursor-pointer flex py-1 px-3 justify-center items-center">
            <MapPin color="#EF4444" />
            <p className="text-[#EF4444]">Delivery Address:</p>
            <p className="flex justify-center items-center text-muted-foreground">
              {address ? (
                address
              ) : (
                <>
                  Add Location <ChevronRight strokeWidth={"1px"} />
                </>
              )}
            </p>
          </button>

          <SideSheet />
          <HoverCard>
            <HoverCardTrigger>
              <button className="bg-[#EF4444] rounded-full py-2 px-2 flex justify-center items-center cursor-pointer">
                <User size={16} color="white" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit">
              <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-[20px] font-bold">{userEmail}</p>
                <button
                  onClick={handleSignOut}
                  className="cursor-pointer text-[14px] py-2 px-3 bg-[#F4F4F5] rounded-full"
                >
                  Sign Out
                </button>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <div className="flex gap-2">
            <Link
              href="/signup"
              className="h-[36px] w-[75px] bg-white rounded-full flex justify-center items-center text-[14px] font-medium"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="h-[36px] w-[65px] bg-[#EF4444] rounded-full justify-center items-center flex text-[14px] font-medium text-white"
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
