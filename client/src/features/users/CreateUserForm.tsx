import { Button, Input } from "@/libs/components";
import { useCreateUser } from "@/libs/data-access/users/useCreateUser";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

export const CreateUserForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const createUser = useCreateUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const userData = {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      password: password,
    };

    try {
      await createUser.mutateAsync(userData);
      alert("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <React.Fragment>
      <h2 className="text-2xl font-inter leading-2xl font-bold text-primary">Register</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Input
            label="First Name"
            id="firstname"
            name="firstname"
            type="text"
            className="border bg-white"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            label="Last Name"
            id="lastname"
            name="lastname"
            type="text"
            className="border bg-white"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            className="border bg-white"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative">
            <div className="relative">
              <Input
                label="Password"
                id="password"
                name="password"
                className="border bg-white"
                type={showPassword ? "text" : "password"}
                required
              />
              <button
                className="pl-2 absolute right-4 top-1/2 transform -translate-y-1/2"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
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

        <div className="flex flex-col gap-2">
          <div className="relative">
            <div className="relative">
              <Input
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                className="border bg-white"
                type={showConfirmPassword ? "text" : "password"}
                required
              />
              <button
                className="pl-2 absolute right-4 top-1/2 transform -translate-y-1/2"
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="size-5 text-black" />
                ) : (
                  <EyeIcon className="size-5 text-black" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full text-white" disabled={createUser.isPending}>
          {createUser.isPending ? "Creating..." : "Create Account"}
        </Button>
      </form>
    </React.Fragment>
  );
};
