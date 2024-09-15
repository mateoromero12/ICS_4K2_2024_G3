import React, { useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import usePedidosTransportista from "../../Hooks/usePedidosTranspotista";

const InterfazTransportista: React.FC = () => {
  const { user, logout } = useAuth();
  const {
    cotizacionesTransportistaLogueadoPendiente,
    cotizacionesTransportistaLogueadoConfirmado,
    obtenerCotizacionesPendientes,
    obtenerCotizacionesConfirmadas,
  } = usePedidosTransportista(user?.id ?? 0);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await obtenerCotizacionesPendientes();
      await obtenerCotizacionesConfirmadas();
      console.log("Polling")
    }, 3000);

    return () => clearInterval(intervalId);
  }, [obtenerCotizacionesPendientes, obtenerCotizacionesConfirmadas]);

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
        Mis Cotizaciones
      </h1>

      <h2 className="text-2xl font-bold text-jade-500 mb-4">Cotizaciones Confirmadas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 w-full max-w-screen-lg">
        {cotizacionesTransportistaLogueadoConfirmado.length > 0 ? (
          cotizacionesTransportistaLogueadoConfirmado.map((cotizacion) => (
            <div
              key={cotizacion.id}
              className="bg-white rounded-lg shadow-md p-6 transition-shadow duration-300 transform hover:shadow-xl hover:scale-105 cursor-pointer"
            >
              <div className="mt-4">
                <p className="text-lg font-bold text-jade-700">Cotización #{cotizacion.id}</p>
                <p className="text-sm text-gray-500">Usuario ID: {cotizacion.usuario_id}</p>
                <p className="mt-2 text-jade-600 text-xl font-semibold">Importe: {cotizacion.importe || 'N/A'}</p>
                <p className="mt-2 text-gray-500">Fecha de Retiro: {cotizacion.fecha_retiro}</p>
                <p className="mt-2 text-gray-500">Fecha de Entrega: {cotizacion.fecha_entrega}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-lg font-semibold">No hay cotizaciones confirmadas disponibles.</p>
        )}
      </div>

      <h2 className="text-2xl font-bold text-jade-500 mt-8 mb-4">Cotizaciones Pendientes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 w-full max-w-screen-lg">
        {cotizacionesTransportistaLogueadoPendiente.length > 0 ? (
          cotizacionesTransportistaLogueadoPendiente.map((cotizacion) => (
            <div
              key={cotizacion.id}
              className="bg-white rounded-lg shadow-md p-6 transition-shadow duration-300 transform hover:shadow-xl hover:scale-105 cursor-pointer"
            >
              <div className="mt-4">
                <p className="text-lg font-bold text-jade-700">Cotización #{cotizacion.id}</p>
                <p className="text-sm text-gray-500">Usuario ID: {cotizacion.usuario_id}</p>
                <p className="mt-2 text-jade-600 text-xl font-semibold">Importe: {cotizacion.importe || 'N/A'}</p>
                <p className="mt-2 text-gray-500">Fecha de Retiro: {cotizacion.fecha_retiro}</p>
                <p className="mt-2 text-gray-500">Fecha de Entrega: {cotizacion.fecha_entrega}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-lg font-semibold">No hay cotizaciones pendientes disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default InterfazTransportista;
