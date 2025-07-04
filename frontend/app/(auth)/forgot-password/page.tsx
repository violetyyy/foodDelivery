import { SquareChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="text-black w-screen h-screen bg-white py-5 pr-5 justify-between flex items-center">
      <div className="w-full justify-center flex">
        <div className="flex-col items-start w-[416px]">
          <SquareChevronLeft size={36} strokeWidth={0.5} />
          <h1 className=" font-semibold text-2xl pt-6">Reset your password</h1>
          <p className=" text-[16px] font-normal text-[#71717A] my-6">
            Enter your email to receive a password reset link.
          </p>
          <input
            type="text"
            className=" w-full h-[36px] p-3 border border-gray-300 rounded-md"
            placeholder="Enter your email address"
          />
          <button className="w-full h-[36px] mt-6 bg-black text-white rounded-md">
            Send link
          </button>
          <div className="flex gap-3 mt-6 justify-center">
            <p className="text-[16px] font-normal text-[#71717A]">
              Don't have an account?
            </p>
            <Link
              className="text-[16px] font-normal text-[#2563EB] cursor-pointer"
              href={"/signup"}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <img src="/cycle.png" alt="delivering" className="h-full" />
    </div>
  );
}
