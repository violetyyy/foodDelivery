import { Orders } from "../../components/adminLayout/orders";
import SideBar from "../../components/adminLayout/sidebar/Sidebar";

export default function Admin() {
  return (
    <div className="flex w-full">
      <div className="ml-[24px]">
        <SideBar page={"1"}></SideBar>
      </div>
      <div className="flex-1 pl-[229px] pt-[84px]">
        <Orders></Orders>
      </div>
    </div>
  );
}
