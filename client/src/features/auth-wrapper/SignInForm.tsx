import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button, Input } from "@/libs/components";
import { useSignIn } from "@/libs/data-access/auth/useSignIn";
import { APP_ROUTES } from "@/routes/routeTypes";

export const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const signInMutation = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signInMutation.mutate(
      {
        username: email,
        password,
      },
      {
        onSuccess: () => {
          toast.success("¡Inicio de sesión exitoso!");
          void navigate(APP_ROUTES.dashboard);
        },
        onError: (error) => {
          const errorMessage =
            typeof error.message === "string" && error.message !== ""
              ? error.message
              : "Error al iniciar sesión";
          toast.error(errorMessage);
        },
      },
    );
  };

  return (
    <div className="w-full max-w-md space-y-8 px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
        <p className="mt-2 text-sm text-gray-600">Ingresa tus credenciales para continuar</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <Input
              label="Email"
              id="email"
              type="email"
              className="w-full border"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div>
            <div className="relative">
              <Input
                label="Contraseña"
                id="password"
                className="w-full border"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
              </button>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-2">
          Continuar
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">¿No tienes una cuenta? </span>
          <Button
            variant="link"
            className="text-primary hover:text-primary/80 font-semibold"
            onClick={() => navigate(APP_ROUTES.signup)}
          >
            Crear cuenta
          </Button>
        </div>
      </form>
    </div>
  );
};
