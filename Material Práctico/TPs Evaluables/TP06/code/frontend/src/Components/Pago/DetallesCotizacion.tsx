import React from "react";
import { Cotizacion } from "../../Types/Cotizacion";
import { formatDate } from "../../Utils/dateUtils";

interface DetallesCotizacionProps {
  cotizacion: Cotizacion;
}

const DetallesCotizacion: React.FC<DetallesCotizacionProps> = ({ cotizacion }) => (
  <div className="mt-4">
    <h2 className="text-xl font-semibold text-jade-600">Cotización #{cotizacion.id}</h2>
    <p className="text-md">
      <strong>Fecha de retiro:</strong> {formatDate(cotizacion.fecha_retiro)}
    </p>
    <p className="text-md">
      <strong>Fecha de entrega:</strong> {formatDate(cotizacion.fecha_entrega)}
    </p>
    <p className="text-md">
      <strong>Estado:</strong> {cotizacion.estado || "No disponible"}
    </p>
    <p className="text-md">
      <strong>Importe:</strong> {cotizacion.importe || "No disponible"}
    </p>
  </div>
);

export default DetallesCotizacion;
