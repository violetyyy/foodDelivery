"use client";

import { Food } from "@/types";
import { useEffect, useState } from "react";

const Footer = () => {
  const [foods, setFoods] = useState<Food[]>([]);

  const fetchFoods = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/food`);
      const responseData = await response.json();
      setFoods(responseData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFoods();
  }, []);
  return (
    <div className="bg-[#18181B] w-full pt-15 pb-20 overflow-hidden flex flex-col items-center gap-20">
      <div className="w-full bg-red-500 whitespace-nowrap mt-8">
        <div className="animate-marquee inline-block font-semibold text-3xl py-7">
          <span className="mx-8 text-white">Fresh fast delivered</span>
          <span className="mx-8 text-white">Fresh fast delivered</span>
          <span className="mx-8 text-white">Fresh fast delivered</span>
          <span className="mx-8 text-white">Fresh fast delivered</span>
          <span className="mx-8 text-white">Fresh fast delivered</span>
          <span className="mx-8 text-white">Fresh fast delivered</span>
        </div>
      </div>
      <div className="container flex items-center gap-[220px]">
        <div className="flex flex-col items-center gap-3 ">
          <img src="/logo.png" alt="" className="w-[46px]" />
          <div className="flex justify-center flex-col items-center">
            <div className="font-semibold text-xl">
              <span className="text-[#FAFAFA]">Nom</span>
              <span className="text-red-500">Nom</span>
            </div>
            <p className="text-xs text-[#F4F4F5]">Swift delivery</p>
          </div>
        </div>
        <div className="text-[16px] text-[#FAFAFA] flex gap-[112px]">
          <div className="flex flex-col gap-4">
            <p className="text-[#71717A]">NOMNOM</p>
            <p>Home</p>
            <p>Contact us</p>
            <p>Delivery zone</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#71717A]">MENU</p>
            <div className="grid grid-rows-5 auto-cols-max grid-flow-col gap-4">
              {foods.map((food) => (
                <p key={food._id} className="mr-10">
                  {food.foodName}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#71717A]">FOLLOW US</p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/">
                <img src="/fb-icon.png" alt="fb" className="w-7" />
              </a>
              <a href="https://www.instagram.com/">
                <img src="/ig-icon.png" alt="ig" className="w-7" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex  border border-r-transparent border-b-transparent border-l-transparent border-t-[#71717A] py-8 gap-12 text-[#71717A]">
        <p>Copy right 2024 © Nomnom LLC</p>
        <p>Privacy policy </p>
        <p>Terms and conditoin</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
};

export default Footer;
