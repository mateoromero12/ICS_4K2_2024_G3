import React from "react";
import { useParams, Link } from "react-router-dom";
import useMetodosPago from "../../Hooks/useMetodosPago";
import useTransportistaID from "../../Hooks/useTransportistaID";
import { formatDate } from "../../Utils/dateUtils";

const InterfazCotizacion: React.FC = () => {
  const dador_id = JSON.parse(localStorage.getItem("user") || "{}").id;
  const { id } = useParams<{ id: string }>();

  const { cotizacion } = useTransportistaID(id ? parseInt(id) : undefined, dador_id);
  const { metodosPago } = useMetodosPago(cotizacion);

  if (!cotizacion) {
    return <p className="text-gray-400 text-center">Cargando información del transportista y cotización...</p>;
  }

  const isDisabled = cotizacion.estado === "Confirmado";

  return (
    <div className="min-h-screen bg-gradient-to-br from-jade-800 to-jade-950 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <img
            src={cotizacion.imagen}
            alt={`Transportista ${cotizacion.transportista_id}`}
            className="w-full h-48 md:h-64 object-cover rounded-lg transition duration-300 transform hover:scale-105"
          />
          <div className="mt-6">
            <h1 className="text-3xl md:text-4xl font-bold text-jade-700">
              Transportista #{cotizacion.transportista_id}
            </h1>
            <p className="text-lg md:text-xl text-gray-600">Usuario ID: {cotizacion.usuario_id}</p>
            <p className="text-2xl mt-2 font-semibold text-jade-600">Calificación: {cotizacion.calificacion}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-jade-800">Detalles de la Cotización</h2>
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-lg md:text-xl">
              <strong>Fecha de retiro:</strong> {formatDate(cotizacion.fecha_retiro)}
            </p>
            <p className="text-lg md:text-xl">
              <strong>Fecha de entrega:</strong> {formatDate(cotizacion.fecha_entrega)}
            </p>
            <p className="text-lg md:text-xl">
              <strong>Importe:</strong> {cotizacion.importe || "No disponible"}
            </p>
            <p className="text-lg md:text-xl">
              <strong>Estado:</strong>{" "}
              {cotizacion.estado === "Pendiente" ? (
                <span className="bg-gray-600 px-2 py-1 rounded-xl text-white">Pendiente</span>
              ) : (
                <span className="bg-jade-900 px-2 py-1 rounded-xl text-white">Confirmado</span>
              )}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-jade-800">Métodos de pago</h2>
          {metodosPago.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {metodosPago.map((metodo, index) => (
                <li
                  key={index}
                  className="p-4 text-jade-950 font-semibold hover:font-bold bg-jade-100 rounded-lg hover:bg-jade-700 hover:text-jade-100 transition duration-200 shadow-sm"
                >
                  <h1 className="uppercase text-lg md:text-xl">{metodo.descripcion}</h1>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg md:text-xl text-gray-500 mt-4">No se encontraron métodos de pago para esta cotización.</p>
          )}
        </div>

        <div className="w-full flex justify-center items-center">
          <Link
            to="/pago"
            state={{ cotizacion, metodosPago, dador_id }}
            className={`bg-jade-600 text-white font-semibold rounded-2xl py-3 px-6 text-lg md:text-xl uppercase transition ${
              isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-jade-300 hover:text-jade-950 transition duration-500"
            }`}
            onClick={(e) => isDisabled && e.preventDefault()}
          >
            Continuar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterfazCotizacion;
