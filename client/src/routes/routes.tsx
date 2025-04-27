// src/routes/routes.tsx
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { RouteGuard } from "./RouteGuard"; // ✨ solo deja pasar si hay token
import { APP_ROUTES } from "./routeTypes";

import MainLayout from "@/layouts/MainLayout"; // ✨ menú lateral + Outlet
import { Auth } from "@/pages"; // ✨ tu login público
import Dashboard from "@/pages/dashboard/Dashboard";
import Home from "@/pages/home/Home"; // ✨ tu landing pública
import Reports from "@/pages/reports/Reports";

export const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {/* 1) PÚBLICAS (sin auth) */}
      <Route path="/" element={<Home />} />
      <Route path={APP_ROUTES.auth} element={<Auth />} />

      {/* 2) PROTEGIDAS: solo con token */}
      <Route element={<RouteGuard />}>
        {/* dentro de MainLayout con sidebar */}
        <Route element={<MainLayout />}>
          <Route path={APP_ROUTES.dashboard} element={<Dashboard />} />
          <Route path={APP_ROUTES.reports} element={<Reports />} />
          {/* … otras rutas privadas … */}
        </Route>
      </Route>

      {/* 3) Cualquier otra URL va al landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
