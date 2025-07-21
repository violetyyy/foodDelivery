import { Orders } from "./orders";
import SideBar from "./sidebar/Sidebar";

export default function Admin() {
  return (
    <div className="flex w-full">
      <div className="ml-[24px]">
        <SideBar page={"1"}></SideBar>
      </div>
      <div>
        <Orders></Orders>
      </div>
    </div>
  );
}
