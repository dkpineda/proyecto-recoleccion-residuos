import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button, Input } from "@/libs/components";
import { useCreateUser } from "@/libs/data-access/users/useCreateUser";
import { APP_ROUTES } from "@/routes/routeTypes";

export const CreateUserForm: React.FC = () => {
  const navigate = useNavigate();
  const createUser = useCreateUser();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    const userData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
    };

    createUser.mutate(userData, {
      onSuccess: () => {
        toast.success("¡Usuario creado exitosamente!");
        void navigate(APP_ROUTES.auth);
      },
      onError: (error) => {
        const errorMessage =
          typeof error.message === "string" && error.message !== ""
            ? error.message
            : "Error al crear el usuario";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="w-full max-w-md space-y-8 px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Registro</h2>
        <p className="mt-2 text-sm text-gray-600">Crea tu cuenta para continuar</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <Input
              label="Nombre"
              id="firstname"
              name="firstname"
              type="text"
              className="w-full border"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Input
              label="Apellido"
              id="lastname"
              name="lastname"
              type="text"
              className="w-full border"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              className="w-full border"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <div className="relative">
              <Input
                label="Contraseña"
                id="password"
                name="password"
                className="w-full border"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
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

          <div>
            <div className="relative">
              <Input
                label="Confirmar Contraseña"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full border"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                type="button"
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="size-5" />
                ) : (
                  <EyeIcon className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white py-2"
          disabled={createUser.isPending}
        >
          {createUser.isPending ? "Creando..." : "Crear Cuenta"}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">¿Ya tienes una cuenta? </span>
          <Button
            variant="link"
            className="text-primary hover:text-primary/80 font-semibold"
            onClick={() => navigate(APP_ROUTES.auth)}
          >
            Iniciar sesión
          </Button>
        </div>
      </form>
    </div>
  );
};
