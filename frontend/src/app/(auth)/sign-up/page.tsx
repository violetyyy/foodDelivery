"use client";
import SignUpField from "@/components/auth/sign-up/SignUp";

const SignUpPage = () => {
  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <SignUpField />
      </div>
      
      {/* Image Section */}
      <div className="hidden lg:block lg:w-1/2">
        <img 
          src="/auth.png" 
          alt="Food delivery illustration" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
