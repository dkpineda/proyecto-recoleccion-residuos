import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { RouteGuard } from "./RouteGuard";
import { APP_ROUTES } from "./routeTypes";

import MainLayout from "@/layouts/MainLayout";
import { Auth } from "@/pages";
import Dashboard from "@/pages/dashboard/Dashboard";
import Home from "@/pages/home/Home";
import Reports from "@/pages/reports/Reports";

export const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={APP_ROUTES.auth} element={<Auth />} />

      <Route element={<RouteGuard />}>
        <Route element={<MainLayout />}>
          <Route path={APP_ROUTES.dashboard} element={<Dashboard />} />
          <Route path={APP_ROUTES.reports} element={<Reports />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
