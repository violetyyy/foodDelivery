"use client";
import SignInField from "@/components/auth/sign-in/SignIn";

const SignInPage = () => {
  return (
    <div className="flex justify-center h-screen  items-center">
      <div className="container  flex justify-between items-center h-full px-20">
        <div className="w-md">
          <SignInField />
        </div>
        <img src="/auth.png" alt="" className="h-9/10" />
      </div>
    </div>
  );
};

export default SignInPage;
