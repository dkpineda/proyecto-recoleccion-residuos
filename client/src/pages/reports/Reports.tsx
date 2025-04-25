// src/pages/reports/Reports.tsx
import axios from "axios";
import React, { useEffect, useState } from "react";

type Report = {
  date: string;
  waste_type: string;
  weight: number;
};

const Reports: React.FC = () => {
  const [filtros, setFiltros] = useState({
    user_id: "",
    waste_type: "",
    date_star: "",
    date_end: "",
  });
  const [reports, setReports] = useState<Report[]>([]);

  const handleBuscar = async () => {
    try {
      const { data } = await axios.get<Report[]>("http://localhost:5000/reports");
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleBuscar();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Historial de Reportes</h2>

      {/* FILTROS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="number"
          placeholder="ID Usuario"
          className="border rounded p-2 focus:ring-2 focus:ring-blue-300"
          value={filtros.user_id}
          onChange={(e) => setFiltros({ ...filtros, user_id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tipo de Residuo"
          className="border rounded p-2 focus:ring-2 focus:ring-blue-300"
          value={filtros.waste_type}
          onChange={(e) => setFiltros({ ...filtros, waste_type: e.target.value })}
        />
        <input
          type="date"
          className="border rounded p-2 focus:ring-2 focus:ring-blue-300"
          value={filtros.date_star}
          onChange={(e) => setFiltros({ ...filtros, date_star: e.target.value })}
        />
        <input
          type="date"
          className="border rounded p-2 focus:ring-2 focus:ring-blue-300"
          value={filtros.date_end}
          onChange={(e) => setFiltros({ ...filtros, date_end: e.target.value })}
        />
      </div>
      <button
        onClick={handleBuscar}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Buscar
      </button>

      {/* TABLA */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Fecha</th>
              <th className="border px-4 py-2 text-left">Tipo de Residuo</th>
              <th className="border px-4 py-2 text-right">Peso</th>
              <th className="border px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} className={i % 2 === 0 ? "" : "bg-gray-50"}>
                <td className="border px-4 py-2">{r.date}</td>
                <td className="border px-4 py-2">{r.waste_type}</td>
                <td className="border px-4 py-2 text-right">{r.weight} kg</td>
                <td className="border px-4 py-2 text-center">
                  <button className="text-blue-600 hover:underline">PDF</button>
                </td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td colSpan={4} className="border px-4 py-2 text-center">
                  No hay reportes que mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
