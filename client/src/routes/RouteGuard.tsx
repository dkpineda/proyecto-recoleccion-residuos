import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RouteGuard: React.FC = () => {
  const token = localStorage.getItem("token");
  
  if (!token) return <Navigate to="/auth" replace />;
  return <Outlet />;
};
