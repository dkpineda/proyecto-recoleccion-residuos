import { SignInForm } from "./SignInForm";

import logo from "@/assets/logo.png";

export const AuthLayout: React.FC = () => {

  return (
    <div className="flex h-screen bg-background">
      <div className="flex w-1/2 bg-black justify-center items-center">
        <img src={logo} alt="logo" className="size-1/2 object-contain" />
      </div>
      <div className="flex w-1/2 items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-6">
          <SignInForm />
        </div>
      </div>
    </div>
  );
};
