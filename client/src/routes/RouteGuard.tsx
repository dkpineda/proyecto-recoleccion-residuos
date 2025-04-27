// src/routes/RouteGuard.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RouteGuard: React.FC = () => {
  const token = localStorage.getItem("token");
  // Si no hay token, te manda al login
  if (!token) return <Navigate to="/auth" replace />;
  return <Outlet />;
};
