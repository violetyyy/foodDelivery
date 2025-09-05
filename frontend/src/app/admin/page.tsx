"use client";
import { useCallback, useEffect, useState } from "react";
import AdminCategory from "@/components/admin/category/Category";
import AdminMenu from "@/components/admin/menu/AdminMenu";
import SideBar from "@/components/admin/sidebar/Sidebar";
import TopIcon from "@/components/admin/topIcon/TopIcon";
import { fetchCategories, fetchFoods } from "@/functions/fetcherFunctions/GET";
import type { Category, Food } from "@/types";
const Menu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const fetchAllData = useCallback(() => {
    fetchCategories(setCategories);
    fetchFoods(setFoods);
  }, []);
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <div className="flex bg-[#F4F4F5] gap-6 min-h-screen">
      <SideBar page={"Menu"}></SideBar>
      <div className="ml-[230px] mt-6 mb-13  mr-10 w-full flex flex-col gap-6">
        <TopIcon></TopIcon>
        <AdminCategory
          categories={categories}
          foods={foods}
          fetchAllData={fetchAllData}
        ></AdminCategory>

        <AdminMenu
          categories={categories}
          foods={foods}
          fetchAllData={fetchAllData}
        ></AdminMenu>
      </div>
    </div>
  );
};

export default Menu;
