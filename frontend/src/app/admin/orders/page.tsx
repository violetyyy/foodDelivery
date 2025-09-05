"use client";
import { Orders } from "@/components/admin/orders/Orders";
import SideBar from "@/components/admin/sidebar/Sidebar";
import TopIcon from "@/components/admin/topIcon/TopIcon";

const Admin = () => {
  return (
    <div className="flex bg-[#F4F4F5] gap-6 min-h-screen h-auto">
      <SideBar page={"Orders"}></SideBar>
      <div className="ml-[230px] mt-6 mb-13 mr-10 w-full flex flex-col gap-6">
        <TopIcon></TopIcon>
        <Orders></Orders>
      </div>
    </div>
  );
};

export default Admin;
