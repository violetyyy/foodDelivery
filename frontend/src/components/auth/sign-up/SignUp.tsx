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

const signUpSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .required("Please enter your first name"),
  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .required("Please enter your last name"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Please enter a password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

type SignUpFormData = yup.InferType<typeof signUpSchema>;

const SignUpField = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupError, setSignupError] = useState("");
  const { setUser, setToken } = useContext(UserContext);

  const submit = async (data: SignUpFormData) => {
    try {
      setSignupError("");
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      
      if (response.data.data.token) {
        setToken(response.data.data.token);
        setUser(response.data.data.user);
        router.push("/");
      }
    } catch (error: any) {
      setSignupError(error.response?.data?.message || "Sign up failed. Please try again.");
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
        <p className="text-gray-600">
          Join us to discover amazing food and have it delivered to your doorstep.
        </p>
      </div>

      {signupError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{signupError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First name
            </label>
            <input
              {...register("firstName")}
              type="text"
              id="firstName"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.firstName ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last name
            </label>
            <input
              {...register("lastName")}
              type="text"
              id="lastName"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.lastName ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

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
            placeholder="john.doe@example.com"
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
              placeholder="Create a strong password"
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

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm password
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.confirmPassword ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
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
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpField;
