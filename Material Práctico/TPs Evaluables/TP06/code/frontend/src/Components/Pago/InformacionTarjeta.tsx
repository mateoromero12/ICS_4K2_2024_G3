import React, { useState, ChangeEvent, FocusEvent } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Cards, { Focused } from "react-credit-cards-2";
import { Tarjeta } from "../../Types/Tarjeta";
import "react-credit-cards-2/dist/es/styles-compiled.css";

interface InformacionTarjetaProps {
  tarjeta: Tarjeta;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleInputFocus: (e: FocusEvent<HTMLInputElement>) => void;
}

const InformacionTarjeta: React.FC<InformacionTarjetaProps> = ({
  tarjeta,
  handleInputChange,
  handleInputFocus,
}) => {
  const [showCVV, setShowCVV] = useState(false);
  const [showSaldo, setShowSaldo] = useState(false);

  const toggleShowCVV = () => setShowCVV(!showCVV);
  const toggleShowSaldo = () => setShowSaldo(!showSaldo);

  return (
    <div className="mt-6">
      <h2 className="text-xl mb-3 font-semibold text-jade-600">
        Información de la tarjeta
      </h2>
      <Cards
        number={tarjeta.numero_tarjeta || ""}
        name={tarjeta.nombre_completo || ""}
        expiry={tarjeta.expiry || ""}
        cvc={tarjeta.cvv || ""}
        focused={(tarjeta.focus as Focused) || undefined}
      />

      <div className="mt-4">
        <label className="block mb-2 text-md text-gray-700">Tipo de tarjeta</label>
        <input
          type="text"
          name="tipo"
          value={tarjeta.tipo || ""}
          readOnly
          className="block w-full p-2 rounded-lg border-2 border-jade-300"
        />
      </div>

      {(tarjeta.tipo === "Debito" || tarjeta.tipo === "Credito") && (
        <div className="mt-4 relative">
          <label className="block mb-2 text-md text-gray-700">Saldo</label>
          <input
            type={showSaldo ? "text" : "password"}
            name="saldo"
            value={tarjeta.saldo || ""}
            readOnly
            className="block w-full p-2 rounded-lg bg-gray-100 border-2 border-jade-300"
          />
          <div onClick={toggleShowSaldo} className="absolute right-4 top-11">
            {showSaldo ? <AiFillEyeInvisible  className="text-xl"/> : <AiFillEye className="text-xl"/>}
          </div>
        </div>
      )}

      <div className="mt-4">
        <label className="block mb-2 text-md text-gray-700">Número de tarjeta</label>
        <input
          type="text"
          name="numero_tarjeta"
          value={tarjeta.numero_tarjeta}
          readOnly
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="block w-full p-2 rounded-lg border-2 border-jade-300"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-2 text-md text-gray-700">Nombre completo</label>
        <input
          type="text"
          name="nombre_completo"
          readOnly
          value={tarjeta.nombre_completo || ""}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="block w-full p-2 rounded-lg border-2 border-jade-300"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-2 text-md text-gray-700">Fecha de expiración (MM/YYYY)</label>
        <input
          type="text"
          name="expiry"
          readOnly
          value={tarjeta.expiry || ""}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="block w-full p-2 rounded-lg border-2 border-jade-300"
          placeholder="MM/YYYY"
          maxLength={7}
        />
      </div>

      <div className="mt-4 relative">
        <label className="block mb-2 text-md text-gray-700">CVC</label>
        <input
          type={showCVV ? "text" : "password"}
          name="cvv"
          readOnly
          value={tarjeta.cvv || ""}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="block w-full p-2 rounded-lg border-2 border-jade-300"
          maxLength={4}
        />
        <div onClick={toggleShowCVV} className="absolute right-4 top-11">
          {showCVV ? <AiFillEyeInvisible className="text-xl"/> : <AiFillEye className="text-xl"/>}
        </div>
      </div>
    </div>
  );
};

export default InformacionTarjeta;
