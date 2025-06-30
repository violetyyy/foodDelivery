import { SquareChevronLeft } from "lucide-react";

export default function SignUp() {
  return (
    <div className="text-black w-screen h-screen bg-white py-5 pr-5 justify-between flex items-center">
      <div className="w-full justify-center flex">
        <div className="flex-col items-start w-[416px]">
          <SquareChevronLeft size={36} strokeWidth={0.5} />
          <h1 className=" font-semibold text-2xl pt-6">Create your account</h1>
          <p className=" text-[16px] font-normal text-[#71717A] my-6">
            Sign up to explore your favorite dishes
          </p>
          <input
            type="text"
            className=" w-full h-[36px] p-3 border border-gray-300 rounded-md"
            placeholder="Enter your email address"
          />
          <button className="w-full h-[36px] mt-6 bg-[#71717A] rounded-md">
            Let's go
          </button>
          <div className="flex gap-3 mt-6 justify-center">
            <p className="text-[16px] font-normal text-[#71717A]">
              Already have an account?
            </p>
            <p className="text-[16px] font-normal text-[#2563EB] cursor-pointer">
              Log in
            </p>
          </div>
        </div>
      </div>
      <img src="/cycle.png" alt="delivering" className="h-full" />
    </div>
  );
}
