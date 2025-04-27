// src/features/auth-wrapper/SignInForm.tsx
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Input } from "@/libs/components";
import { APP_ROUTES } from "@/routes/routeTypes";

export const SignInForm: React.FC = () => {
  const navigate = useNavigate();

  // estados para el form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Llamada a tu endpoint de login
      const { data } = await axios.post("http://localhost:5000/auth/login", {
        username: email,
        // Cambié a username porque en el backend lo espera así
        password,
      });
      // Asumo que devuelves { token, user: { firstname, ... } }
      const { token, user } = data;

      // Guarda token y firstname para el dashboard
      localStorage.setItem("token", token);
      localStorage.setItem("firstname", user.firstname);

      // Redirige al dashboard protegido
      navigate(APP_ROUTES.dashboard);
    } catch (err) {
      console.error("Login fallido:", err);
      // Aquí podrías usar un toast o setear un error en pantalla
    }
  };

  return (
    <React.Fragment>
      <h2 className="text-2xl font-inter leading-2xl font-bold text-primary">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
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

        {/* Password */}
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

        {/* Botón */}
        <Button type="submit" className="w-full text-white">
          Continuar
        </Button>
      </form>
    </React.Fragment>
  );
};
