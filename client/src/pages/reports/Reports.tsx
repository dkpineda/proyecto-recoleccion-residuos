import axios from "axios";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';


type Report = {
  id: string;
  date: string;
  user: { firstname: string; lastname: string };
  neighborhood: { name: string; location: { name: string } };
  waste_type: { name: string ;id: string };
  weight: number;
  description?: string;
  points: number;
};


const Reports: React.FC = () => {
  const [filtros, setFiltros] = useState({
    user_id: "",
    id_waste_type: "",
    date_star: "",
    date_end: "",
    neighborhood_id: "",
  });
  const [reports, setReports] = useState<Report[]>([]);

  const [usuarios, setUsuarios] = useState<{ id: string; firstname: string; lastname: string }[]>([]);
  const [barrios, setBarrios] = useState<{ id: string; name: string }[]>([]);
  const [wasteTypes, setWasteTypes] = useState<{ id: string; name: string }[]>([]); 
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
    fetchUsuarios();
    fetchBarrios();
    fetchTipos();
  }, []);

const fetchUsuarios = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/users/"); // <-- Ajusta la URL si es distinta
    setUsuarios(data);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};
const fetchBarrios = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/neighborhoods/"); // <-- Ajusta la URL si es distinta
    setBarrios(data);
  } catch (error) {
    console.error("Error al obtener barrios:", error);
  }
};
const fetchTipos = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/wastetypes/"); // <-- Ajusta la URL si es distinta
    setWasteTypes(data);
  } catch (error) {
    console.error("Error al obtener tipos:", error);
  }
};

// Crear datos agregados
const reportesPorTipo = reports.reduce((acc: { [key: string]: number }, r) => {
  const tipo = r.waste_type.name;
  acc[tipo] = (acc[tipo] || 0) + r.weight;
  return acc;
}, {});

const datosGrafico = Object.entries(reportesPorTipo).map(([tipo, peso]) => ({
  tipo,
  peso,
}));
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Historial de Reportes</h2>

      {/* FILTROS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <select
        className="border rounded p-2 focus:ring-2 focus:ring-blue-300"
        value={filtros.user_id}
        onChange={(e) => {
          setFiltros({ ...filtros, user_id: e.target.value });
        }}
      >
        <option value="">-- Seleccionar Usuario --</option>
        {usuarios.map((u) => (
          <option key={u.id} value={u.id}>
            {u.firstname} {u.lastname}
          </option>
        ))}
      </select>

      <select
        className="border rounded p-2 focus:ring-2 focus:ring-blue-300"
        value={filtros.id_waste_type}
        onChange={(e) => {
          setFiltros({ ...filtros, id_waste_type: e.target.value });
        }}
      >
        <option value="">-- Seleccionar Tipo --</option>
        {wasteTypes.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

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
      {/* grafica*/}
        <h3 className="text-xl font-semibold mb-4 mt-8">Gráfica: Peso reciclado por tipo de residuo</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={datosGrafico}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tipo" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="peso" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
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
              <th className="border px-4 py-2 text-left">Puntos</th>
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
                <td className="border px-4 py-2">{r.waste_type.name}</td>
                <td className="border px-4 py-2 text-right">{r.weight} kg</td>
                <td className="border px-4 py-2">{r.points}</td>
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
