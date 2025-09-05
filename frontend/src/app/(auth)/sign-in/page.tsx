"use client";
import SignInField from "@/components/auth/sign-in/SignIn";

const SignInPage = () => {
  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <SignInField />
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

export default SignInPage;
