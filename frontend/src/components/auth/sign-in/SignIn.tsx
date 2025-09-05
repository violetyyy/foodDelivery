"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";

const logInSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(6, "Please enter minimum 6 characters at least")
    .required("Please enter a password"),
});

type LogInFormData = yup.InferType<typeof logInSchema>;

const SignInField = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormData>({
    resolver: yupResolver(logInSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const submit = async (data: LogInFormData) => {
    await axios
      .post("http://localhost:4000/auth/sign-in", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        localStorage.setItem("userToken", res.data.token);
        console.log(res.data);
      });
    router.push("/");
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
        <p className="text-2xl font-semibold text-[#09090B]">Log in </p>
        <p className="text-[#71717A] text-[16px]">
          Log in to enjoy your favorite dishes.
        </p>
      </div>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-4">
          <input
            {...register("email")}
            type="email"
            className="w-full text-[#71717A] px-3 py-2 border border-[#E4E4E7] focus:outline-0 rounded-md"
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            {...register("password")}
            id="password"
            type="password"
            className="w-full text-[#71717A] px-3 py-2 border border-[#E4E4E7] focus:outline-0 rounded-md"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <div className="flex w-full justify-end">
            <p className="cursor-pointer">Forgot password ?</p>
          </div>
        </div>

        <button
          className={`py-2 border rounded-md text-white cursor-pointer w-full ${
            errors ? "bg-[#9d9da0]" : "bg-[#2563EB]"
          }`}
          type="submit"
        >
          Let's Go
        </button>
      </form>

      <p className="text-[#71717A] text-center">
        Already have an account?
        <span className={`text-[#2563EB] cursor-pointer`}> Log in</span>
      </p>
    </div>
  );
};

export default SignInField;
