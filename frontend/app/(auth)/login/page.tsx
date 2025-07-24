"use client";

import { SquareChevronLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/navigation";
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

  const onSubmit = async (formData: SignInFormData) => {
    try {
      const res = await fetch("http://localhost:8000/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Login response data:", data);

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      } else {
        alert("Successfully logged in!");
      }

      localStorage.setItem("userEmail", data.user?.email || "");
      localStorage.setItem("token", data.token);

      console.log("Saved email to localStorage:", data.user?.email);

      router.push("/");
    } catch (err: any) {
      console.error("Login error:", err);
      alert(err.message);
    }
  };

  return (
    <div className="text-black w-screen h-screen bg-white py-5 pr-5 justify-between flex items-center">
      <div className="w-full justify-center flex">
        <div className="flex-col items-start w-[416px]">
          <SquareChevronLeft size={36} strokeWidth={0.5} />
          <h1 className=" font-semibold text-2xl pt-6">
            Login to your account
          </h1>
          <p className=" text-[16px] font-normal text-[#71717A] my-6">
            Login to enjoy your favorite dishes
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("email")}
              type="email"
              className="w-full h-[36px] p-3 border border-gray-300 rounded-md"
              placeholder="Enter your email address"
            />
            <input
              {...register("password")}
              id="password"
              type="password"
              className=" w-full h-[36px] p-3 border border-gray-300 rounded-md mt-6"
              placeholder="Password"
            />
            <Link
              href={"/forgot-password"}
              className=" font-normal text-[14px] underline mt-6 cursor-pointer"
            >
              Forgot password?
            </Link>
            <button
              type="submit"
              className="w-full h-[36px] mt-6 bg-black text-white rounded-md flex justify-center items-center cursor-pointer"
            >
              Let's go
            </button>
          </form>

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
