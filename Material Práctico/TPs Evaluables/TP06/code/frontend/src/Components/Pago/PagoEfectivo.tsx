import React, { ChangeEvent } from "react";

interface PagoEfectivoProps {
  efectivo: string;
  onEfectivoChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PagoEfectivo: React.FC<PagoEfectivoProps> = ({ efectivo, onEfectivoChange }) => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold text-jade-600">Pago en efectivo</h2>

    <div className="mt-4">
      <label className="block mb-2 text-md text-gray-700">Monto a pagar</label>
      <input
        type="text"
        value={efectivo}
        onChange={onEfectivoChange}
        className="block w-full p-2 border border-gray-300 rounded-lg"
        placeholder="Ingrese el monto con el que pagará"
      />
    </div>
  </div>
);

export default PagoEfectivo;
