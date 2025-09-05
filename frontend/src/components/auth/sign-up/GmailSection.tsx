import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const GmailSection = ({ setPage }: { setPage: (str: string) => void }) => {
  const next = () => {
    setPage("password");
  };
  return (
    <div className=" p-4 flex flex-col gap-6">
      <div>
        <Link href={"/"}>
          <button className=" p-2 border border-[#E4E4E7] rounded-md hover:bg-[#E4E4E7] cursor-pointer">
            <ChevronLeft />
          </button>
        </Link>
      </div>
      <div>
        <p className="text-2xl font-semibold text-[#09090B]">
          Create your account
        </p>
        <p className="text-[#71717A] text-[16px]">
          Sign up to explore your favorite dishes.
        </p>
      </div>
      <div>
        <input
          type="text"
          className="w-full text-[#71717A] px-3 py-2 border border-[#E4E4E7] focus:outline-0 rounded-md"
          placeholder="Enter your email address"
        />
      </div>
      <button
        className="py-2 border rounded-md bg-[#9d9da0] text-white cursor-pointer"
        onClick={next}
      >
        Let's Go
      </button>
      <p className="text-[#71717A] text-center">
        Already have an account?
        <span className="text-[#2563EB] cursor-pointer"> Log in</span>
      </p>
    </div>
  );
};

export default GmailSection;
