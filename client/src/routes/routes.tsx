import React from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { APP_ROUTES } from "./routeTypes";

import { Auth } from "@/pages";

const RouteGuard: React.FC = () => {

  return <Outlet />;
};

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<RouteGuard />}>
            <Route path={APP_ROUTES.auth} element={<Auth />} />
          </Route>
          <Route path="*" element={<Navigate to={APP_ROUTES.auth} replace />} />
        </Routes>
    </BrowserRouter>
  );
};
