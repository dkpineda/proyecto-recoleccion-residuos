
import axios from "axios";
import { EyeIcon, EyeOffIcon, Link } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Input } from "@/libs/components";
import { APP_ROUTES } from "@/routes/routeTypes";

export const SignInForm: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/auth/login", {
        username: email,
        password,
      });
      const { token, user } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("firstname", user.firstname);

      navigate(APP_ROUTES.dashboard);
    } catch (err) {
      console.error("Login fallido:", err);
    }
  };

  return (
    <React.Fragment>
      <h2 className="text-2xl font-inter leading-2xl font-bold text-primary">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <Input
            label="Email"
            id="email"
            type="email"
            className="border bg-white"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative">
            <Input
              label="Password"
              id="password"
              className="border bg-white"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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

        <Button type="submit" className="w-full text-white">
          Continuar
        </Button>

        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="text-primary hover:text-primary/80 font-semibold">
            Sign Up
          </Link>
        </div>
      </form>
    </React.Fragment>
  );
};
