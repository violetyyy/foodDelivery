import Link from "next/link";

export const Header = () => {
  return (
    <div className="bg-[#18181B] py-[12px] px-[88px] flex justify-between items-center fixed top-0 w-screen">
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
      <div className=" flex gap-3">
        <Link
          href={"/signup"}
          className="h-[36px] w-[75px] bg-white rounded-full flex justify-center items-center text-[14px] font-medium"
        >
          Sign Up
        </Link>
        <Link
          href={"/login"}
          className="h-[36px] w-[65px] bg-[#EF4444] rounded-full justify-center items-center flex text-[14px] font-medium text-white"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};
