import SignUpField from "@/components/auth/sign-up/SignUp";

const SignUpPage = () => {
  return (
    <div className="flex justify-center h-screen w-full items-center">
      <div className="container  flex px-20 justify-between items-center h-full">
        <div className="w-md">
          <SignUpField />
        </div>
        <img src="/auth.png" alt="" className="h-9/10" />
      </div>
    </div>
  );
};

export default SignUpPage;
