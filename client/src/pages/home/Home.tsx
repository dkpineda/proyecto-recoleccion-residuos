// src/pages/home/Home.tsx
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bienvenido a Mi Aplicación</h1>
        <div className="space-x-4">
          <Link
            to="/auth"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Iniciar Sesión
          </Link>
          {/* Si luego quieres un registro separado puedes agregar otro botón aquí */}
        </div>
      </header>

      {/* Cuerpo */}
      <main className="flex-grow flex flex-col justify-center items-center p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">¡Gestiona tus residuos de forma fácil!</h2>
        <p className="text-gray-700 max-w-lg">
          Nuestra plataforma te permite registrar, gestionar y exportar toda la información de
          recolección de residuos domésticos.
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-700 text-center p-4">
        © 2025 Mi Aplicación - Todos los derechos reservados
      </footer>
    </div>
  );
};

export default Home;
