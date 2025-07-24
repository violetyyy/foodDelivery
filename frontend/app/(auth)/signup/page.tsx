"use client";

import { SquareChevronLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/navigation";

const signInSchema = yup.object({
  email: yup
    .string()
    .email("Email not valid")
    .required("Enter your email address"),
  password: yup
    .string()
    .min(6, "Password must include 6 characters")
    .required("Please enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

type SignInFormData = yup.InferType<typeof signInSchema>;

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
    mode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (formData: SignInFormData) => {
    try {
      const res = await fetch("http://localhost:8000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      alert("Account created successfully! Login to your account");
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    }
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
            type={showPassword ? "text" : "password"}
            className=" w-full h-[36px] p-3 border border-gray-300 rounded-md"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <input
            {...register("confirmPassword")}
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            className="w-full h-[36px] p-3 border border-gray-300 rounded-md mt-6"
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          <div className=" mt-6 flex gap-2 align-middle ">
            <input
              type="checkbox"
              className="w-4 rounded-sm fill-black"
              onChange={() => setShowPassword((prev) => !prev)}
            />

            <p className=" font-normal text-[14px] text-[#71717A]">
              Show password
            </p>
          </div>
          <button
            type="submit"
            className="w-full h-[36px] mt-6 bg-black text-white rounded-md justify-center items-center flex"
          >
            Let's go
          </button>
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
