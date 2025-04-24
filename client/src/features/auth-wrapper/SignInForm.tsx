import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Button, Input } from "@/libs/components";

export const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <React.Fragment>
      <h2 className="text-2xl font-inter leading-2xl font-bold text-primary">Login</h2>
      <form className="space-y-4">
        <div className="flex flex-col gap-2">
          <Input
            label="Email"
            id="email"
            type="email"
            className="border bg-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative">
            <div className="relative">
              <Input
                label="Password"
                id="password"
                className="border bg-white"
                type={showPassword ? "text" : "password"}
              />
            <button
              className="pl-2 absolute right-4 top-1/2 transform -translate-y-1/2"
              type="button"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <EyeOffIcon className="size-5 text-black" />
              ) : (
                  <EyeIcon className="size-5 text-black" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full text-white"
        >
          Continue
        </Button>
      </form>
    </React.Fragment>
  );
};
