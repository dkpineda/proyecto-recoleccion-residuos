import { useState } from "react";
import { SignInForm } from "./SignInForm";

export const AuthLayout: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <div className="flex h-screen bg-background">
      <div className="flex w-1/2 bg-black justify-center items-center">
      </div>
      <div className="flex w-1/2 items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-6">
          <SignInForm />
        </div>
      </div>
    </div>
  );
};
