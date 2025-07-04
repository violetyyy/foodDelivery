"use client";

import { SquareChevronLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const signInSchema = yup.object({
  email: yup
    .string()
    .email("Email not valid")
    .required("Enter your email address"),
  password: yup
    .string()
    .min(6, "Password must include 6 characters")
    .required("Please must enter your password"),
});

type SignInFormData = yup.InferType<typeof signInSchema>; // typescript utility type

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema), // connect with yup validation
    mode: "onChange",
  });

  const onSubmit = async (formData: SignInFormData) => {
    console.log("formData", formData);
  };

  return (
    <div className="text-black w-screen h-screen bg-white py-5 pr-5 justify-between flex items-center">
      <form
        className="w-full justify-center flex "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex-col items-start w-[416px]">
          <SquareChevronLeft size={36} strokeWidth={0.5} />
          <h1 className=" font-semibold text-2xl pt-6">Create your account</h1>
          <p className=" text-[16px] font-normal text-[#71717A] my-6">
            Sign up to explore your favorite dishes
          </p>
          <input
            {...register("email")}
            type="email"
            id="email"
            className=" w-full h-[36px] p-3 border border-gray-300 rounded-md"
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500 mt-3">{errors.email.message}</p>
          )}
          <p className=" text-[16px] font-normal text-[#71717A] my-6">
            Create a strong password with letters and numbers
          </p>
          <input
            {...register("password")}
            id="password"
            type="password"
            className=" w-full h-[36px] p-3 border border-gray-300 rounded-md"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <input
            {...register("password")}
            id="password"
            type="password"
            className=" w-full h-[36px] p-3 border border-gray-300 rounded-md mt-6"
            placeholder="Confirm password"
          />
          <div className=" mt-6 flex gap-2 align-middle ">
            <input type="checkbox" className="w-4 rounded-sm fill-black" />
            <p className=" font-normal text-[14px] text-[#71717A]">
              Show password
            </p>
          </div>
          <Link href={"/"} className="w-full">
            <button
              type="submit"
              className="w-full h-[36px] mt-6 bg-black text-white rounded-md justify-center items-center flex"
            >
              Let's go
            </button>
          </Link>
          <div className="flex gap-3 mt-6 justify-center">
            <p className="text-[16px] font-normal text-[#71717A]">
              Already have an account?
            </p>
            <Link
              className="text-[16px] font-normal text-[#2563EB] cursor-pointer"
              href={"/login"}
            >
              Log In
            </Link>
          </div>
        </div>
      </form>
      <img src="/cycle.png" alt="delivering" className="h-full" />
    </div>
  );
}
