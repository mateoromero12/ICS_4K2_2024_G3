import React from "react";
import { useNavigate } from "react-router-dom";
import useTransportista from "../../Hooks/useTransportista";
import useAuth from "../../Hooks/useAuth";
import { Transportista } from "../../Types/Transportista";

const InterfazDador: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const dador_id = user?.id || 0;

  const handleTransportistaClick = (id: number) => {
    navigate(`/transportista/${id}`);
  };

  const { transportistaDatos } = useTransportista(dador_id);

  const transportistaConfirmado = transportistaDatos.some(
    (transportista: Transportista) => transportista.estado === "Confirmado"
  );

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen w-full flex justify-center flex-col items-center bg-gradient-to-br from-jade-800 to-jade-950 px-4">
      <button
        onClick={logout}
        className="bg-jade-600 hover:bg-jade-700 transition duration-300 text-white font-semibold xs:w-full sm:w-3/4 md:w-1/2 lg:w-1/4 py-2 px-4 rounded-lg mb-8"
      >
        Cerrar Sesión
      </button>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-white transition duration-300 ease-in-out transform hover:scale-105">
        Lista de Transportistas
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 w-full max-w-screen-lg">
        {transportistaDatos.map((transportista: Transportista) => (
          <div
            key={transportista.id}
            className={`bg-white rounded-lg shadow-md p-6 transition-shadow duration-300 transform ${
              transportista.estado === "Confirmado"
                ? "hover:shadow-xl hover:scale-105 cursor-pointer"
                : transportistaConfirmado
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-xl hover:scale-105 cursor-pointer"
            }`}
            onClick={() => handleTransportistaClick(transportista.id)}
            style={transportistaConfirmado && transportista.estado !== "Confirmado" ? { pointerEvents: "none" } : {}}
          >
            <div className="w-full h-48 overflow-hidden rounded-lg">
              <img
                src={transportista.imagen}
                alt={`Transportista ${transportista.id}`}
                className="w-full h-full object-cover object-center transition duration-300 transform hover:scale-110"
              />
            </div>
            <div className="mt-4">
              <p className="text-lg font-bold text-jade-700">Transportista #{transportista.id}</p>
              <p className="text-sm text-gray-500">Usuario ID: {transportista.usuario_id}</p>
              <p className="mt-2 text-jade-600 text-xl font-semibold">Calificación: {transportista.calificacion}</p>
              <p className="mt-2 text-gray-500">Estado: {transportista.estado}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterfazDador;
