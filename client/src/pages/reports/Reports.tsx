// src/pages/reports/Reports.tsx
import axios from "axios";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";

type Report = {
  id: string;
  date: string;
  user: { firstname: string; lastname: string };
  neighborhood: { name: string; location: { name: string } };
  waste_type: string;
  weight: number;
  description?: string;
};

const Reports: React.FC = () => {
  const [filtros, setFiltros] = useState({
    user_id: "",
    waste_type: "",
    date_star: "",
    date_end: "",
    neighborhood_id: "",
  });
  const [reports, setReports] = useState<Report[]>([]);

  // 1) Buscar datos filtrados
  const handleBuscar = async () => {
    try {
      // Eliminamos props vacías
      const params = Object.fromEntries(Object.entries(filtros).filter(([_, v]) => v !== ""));

      const { data } = await axios.get<Report[]>(
        "http://localhost:5000/reports/",
        { params }, // sólo llegan los que tienen valor
      );
      setReports(data);
    } catch (error) {
      console.error("Error al obtener reportes:", error);
    }
  };

  // 2) Función de exportación
  const handleExport = async (format: "excel" | "pdf") => {
    try {
      const params = Object.fromEntries(Object.entries(filtros).filter(([_, v]) => v !== ""));
      const url = `http://localhost:5000/reports/export/${format}`;
      const response = await axios.get(url, {
        params,
        responseType: "blob",
      });
      const ext = format === "excel" ? "xlsx" : "pdf";
      saveAs(response.data, `reportes.${ext}`);
    } catch (error) {
      console.error(`Error al exportar ${format}:`, error);
    }
  };

  useEffect(() => {
    handleBuscar();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Historial de Reportes</h2>

      {/* FILTROS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="ID Usuario"
          className="border rounded p-2 focus:ring-2 focus:ring-blue-300"
          value={filtros.user_id}
          onChange={(e) => {
            setFiltros({ ...filtros, user_id: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Tipo de Residuo"
          className="border rounded p-2 focus:ring-2 focus:ring-blue-300"
          value={filtros.waste_type}
          onChange={(e) => {
            setFiltros({ ...filtros, waste_type: e.target.value });
          }}
        />
        <input
          type="date"
          className="border rounded p-2 focus:ring-2 focus:ring-blue-300"
          value={filtros.date_star}
          onChange={(e) => {
            setFiltros({ ...filtros, date_star: e.target.value });
          }}
        />
        <input
          type="date"
          className="border rounded p-2 focus:ring-2 focus:ring-blue-300"
          value={filtros.date_end}
          onChange={(e) => {
            setFiltros({ ...filtros, date_end: e.target.value });
          }}
        />
      </div>

      {/* BOTONES DE ACCIÓN */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={handleBuscar}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Buscar
        </button>
        <button
          onClick={() => handleExport("excel")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Exportar Excel
        </button>
        <button
          onClick={() => handleExport("pdf")}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Exportar PDF
        </button>
      </div>

      {/* TABLA DE RESULTADOS */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Fecha</th>
              <th className="border px-4 py-2 text-left">Usuario</th>
              <th className="border px-4 py-2 text-left">Localidad</th>
              <th className="border px-4 py-2 text-left">Barrio</th>
              <th className="border px-4 py-2 text-left">Tipo Residuo</th>
              <th className="border px-4 py-2 text-right">Peso</th>
              <th className="border px-4 py-2 text-left">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} className={i % 2 === 0 ? "" : "bg-gray-50"}>
                <td className="border px-4 py-2">{r.date}</td>
                <td className="border px-4 py-2">
                  {r.user.firstname} {r.user.lastname}
                </td>
                <td className="border px-4 py-2">{r.neighborhood.location.name}</td>
                <td className="border px-4 py-2">{r.neighborhood.name}</td>
                <td className="border px-4 py-2">{r.waste_type}</td>
                <td className="border px-4 py-2 text-right">{r.weight} kg</td>
                <td className="border px-4 py-2">{r.description}</td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td colSpan={8} className="border px-4 py-2 text-center text-gray-500">
                  No hay reportes para mostrar
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
