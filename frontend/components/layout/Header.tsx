"use client";

import { useEffect, useState } from "react";
import { ChevronRight, MapPin, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const Header = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

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
              Add Location <ChevronRight strokeWidth={"1px"} />
            </p>
          </button>

          <Sheet>
            <SheetTrigger asChild>
              <div className="bg-white rounded-full p-2 cursor-pointer">
                <ShoppingCart size={16} color="black" />
              </div>
            </SheetTrigger>
            <SheetContent className="bg-[#404040] p-8 overflow-x-scroll rounded-l-[20px] border-0 !max-w-[505px] overflow-hidden">
              <div className="flex text-cloude-gray gap-6 flex-col w-full h-full">
                <div className="flex gap-2">
                  <ShoppingCart color="white" />
                  <SheetTitle className="font-semibold text-xl text-white">
                    Order detail
                  </SheetTitle>
                </div>

                <div className="flex w-full rounded-full gap-2 bg-white p-1 text-[18px] leading-7">
                  <div className="w-[50%] justify-center flex bg-[#EF4444] rounded-full text-white">
                    Card
                  </div>
                  <div className="w-[50%] justify-center flex">Order</div>
                </div>

                <div className="w-full h-full rounded-[20px] bg-white p-4 flex flex-col justify-between">
                  <div className="flex flex-col gap-5">
                    <p className="font-semibold text-xl text-muted-foreground">
                      My Cart
                    </p>
                    <div className="flex flex-col overflow-y-scroll h-[160px] gap-2 ">
                      <div className="w-[40px] h-[40px] bg-red-500" />
                      <div className="w-[40px] h-[40px] bg-red-500" />
                      <div className="w-[40px] h-[40px] bg-red-500" />
                      <div className="w-[40px] h-[40px] bg-red-500" />
                    </div>
                  </div>
                  <div>jksd</div>
                </div>
                <div className="bg-white h-[38%] w-full flex flex-col rounded-[20px] p-4 gap-5">
                  <div className="text-[20px] font-semibold text-muted-foreground">
                    Payment info
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[16px] text-muted-foreground">
                      Items
                    </div>
                    <div className="text-[16px] font-bold ">$123</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[16px] text-muted-foreground">
                      Shipping
                    </div>
                    <div className="text-[16px] font-bold ">$0.99</div>
                  </div>
                  <div className=" border-t border-foreground-50 border-dashed"></div>
                  <div className="flex justify-between">
                    <div className="text-[16px] text-muted-foreground">
                      Total
                    </div>
                    <div className="text-[16px] font-bold ">$123</div>
                  </div>
                  <Button className="w-full bg-[#EF4444] text-white rounded-[20px]">
                    Checkout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
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
