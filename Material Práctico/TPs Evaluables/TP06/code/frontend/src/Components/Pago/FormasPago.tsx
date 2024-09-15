import React, { ChangeEvent } from "react";
import { MetodoPago } from "../../Types/MetodoPago";

interface FormasPagoProps {
  formaPagoSeleccionada: string;
  metodosPago: MetodoPago[];
  onFormaPagoChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const FormasPago: React.FC<FormasPagoProps> = ({
  formaPagoSeleccionada,
  metodosPago,
  onFormaPagoChange,
}) => (
  <div className="mt-4">
    <label className="block mb-2 text-xl font-semibold text-jade-600">
      Forma de pago
    </label>
    <select
      value={formaPagoSeleccionada}
      onChange={onFormaPagoChange}
      className="block w-full p-2 border border-gray-300 rounded-lg"
    >
      <option value="">Seleccione una opción</option>
      {metodosPago.map((metodo) => (
        <option key={metodo.id} value={metodo.descripcion}>
          {metodo.descripcion}
        </option>
      ))}
    </select>
  </div>
);

export default FormasPago;
