// src/pages/dashboard/Dashboard.tsx
import React from "react";

const Dashboard: React.FC = () => {
  // Simpemente a modo de ejemplo tomamos el nombre del usuario de localStorage
  const firstname = localStorage.getItem("firstname") || "Usuario";
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Hola, {firstname} 👋</h1>
      <p>Bienvenido a tu panel de control.</p>
    </div>
  );
};

export default Dashboard;
