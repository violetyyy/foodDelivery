import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const PasswordSection = ({ setPage }: { setPage: (str: string) => void }) => {
  const submit = () => {};
  const back = () => {
    setPage("gmail");
  };
  return (
    <div className=" p-4 flex flex-col gap-6">
      <div>
        <button
          className=" p-2 border border-[#E4E4E7] rounded-md hover:bg-[#E4E4E7] cursor-pointer"
          onClick={back}
        >
          <ChevronLeft />
        </button>
      </div>
      <div>
        <p className="text-2xl font-semibold text-[#09090B]">
          Create a strong password
        </p>
        <p className="text-[#71717A] text-[16px]">
          Create a strong password with letters, numbers.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          className="w-full text-[#71717A] px-3 py-2 border border-[#E4E4E7] focus:outline-0 rounded-md"
          placeholder="Password"
        />
        <input
          type="text"
          className="w-full text-[#71717A] px-3 py-2 border border-[#E4E4E7] focus:outline-0 rounded-md"
          placeholder="Confirm"
        />
        <div className="flex gap-2 items-center">
          <input type="checkbox" />
          <p className=" text-[#71717A]">Show password</p>
        </div>
      </div>
      <Link href={"./sign-in"}>
        <button
          className="py-2 border rounded-md bg-[#9d9da0] text-white cursor-pointer w-full"
          onClick={submit}
        >
          Let's Go
        </button>
      </Link>
      <p className="text-[#71717A] text-center">
        Already have an account?
        <span className="text-[#2563EB] cursor-pointer"> Log in</span>
      </p>
    </div>
  );
};

export default PasswordSection;
