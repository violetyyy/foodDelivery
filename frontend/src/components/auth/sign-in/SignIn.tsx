"use client";

import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import UserContext from "@/context/userContext";

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
    formState: { errors, isSubmitting },
  } = useForm<LogInFormData>({
    resolver: yupResolver(logInSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { setUser, setToken } = useContext(UserContext);

  const submit = async (data: LogInFormData) => {
    try {
      setLoginError("");
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
        email: data.email,
        password: data.password,
      });
      
      if (response.data.data.token) {
        setToken(response.data.data.token);
        setUser(response.data.data.user);
        router.push("/");
      }
    } catch (error: any) {
      setLoginError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <Link href={"/"}>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Back to home</span>
          </button>
        </Link>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-600">
          Sign in to your account to continue enjoying delicious food.
        </p>
      </div>

      {loginError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{loginError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInField;
