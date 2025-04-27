// src/layouts/MainLayout.tsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

import { APP_ROUTES } from "../routes/routeTypes";

const MainLayout: React.FC = () => (
  <div className="flex h-screen">
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-center text-2xl font-bold border-b border-gray-700">♻️ Residuos</div>
      <nav className="flex-1 p-4 space-y-2">
        <Link to={APP_ROUTES.dashboard} className="block p-2 rounded hover:bg-gray-700 transition">
          Dashboard
        </Link>
        <Link to={APP_ROUTES.reports} className="block p-2 rounded hover:bg-gray-700 transition">
          Gestión de Reportes
        </Link>
        {/* más enlaces aquí */}
      </nav>
    </aside>
    <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
