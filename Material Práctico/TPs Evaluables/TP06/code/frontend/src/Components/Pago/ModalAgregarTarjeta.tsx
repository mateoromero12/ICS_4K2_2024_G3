import React, { useState, ChangeEvent } from "react";
import useTarjetas from "../../Hooks/useTarjetas";

interface ModalAgregarTarjetaProps {
  dador_id: number;
  onClose: () => void;
}

const ModalAgregarTarjeta: React.FC<ModalAgregarTarjetaProps> = ({
  dador_id,
  onClose,
}) => {
  const [newTarjeta, setNewTarjeta] = useState({
    numero_tarjeta: "",
    cvv: "",
    nombre_completo: "",
    fecha_vencimiento: "",
    tipo: "",
    saldo: "" as string | null,
    tipo_documento: "",
    numero_documento: "",
    expiry: "",
    dador_id: dador_id,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { createTarjeta, error: tarjetasError } = useTarjetas(dador_id);

  const obtenerFechaActual = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "numero_tarjeta" && !/^\d{0,16}$/.test(value)) {
      return;
    }

    if (name === "nombre_completo" && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }    

    if (name === "cvv" && !/^\d{0,4}$/.test(value)) {
      return;
    }

    if (name === "numero_documento" && !/^\d{0,8}$/.test(value)) {
      return;
    }

    if (name === "fecha_vencimiento") {
      const [year, month] = value.split("-");
      const formattedDate = `${month}/${year}`;
      setNewTarjeta((prev) => ({
        ...prev,
        [name]: formattedDate,
      }));
      return;
    }

    if (name === "tipo") {
      setNewTarjeta((prev) => ({
        ...prev,
        tipo: value,
        saldo: value === "Debito" ? "11000" : value === "Credito" ? "30000" : null,
      }));
    }    

    setNewTarjeta((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!newTarjeta.numero_tarjeta)
      newErrors.numero_tarjeta = "Número de tarjeta es obligatorio";
    else if (newTarjeta.numero_tarjeta.length !== 16) {
      newErrors.numero_tarjeta = "El número de tarjeta debe tener 16 dígitos";
    }
    
    if (!newTarjeta.cvv) 
      newErrors.cvv = "CVV es obligatorio";
    else if (newTarjeta.cvv.length !== 3 && newTarjeta.cvv.length !== 4) {
      newErrors.cvv = "El CVV debe tener 3 o 4 dígitos";
    }
    
    if (!newTarjeta.nombre_completo)
      newErrors.nombre_completo = "Nombre completo es obligatorio";
    
    if (!newTarjeta.fecha_vencimiento)
      newErrors.fecha_vencimiento = "Fecha de vencimiento es obligatoria";
    
    if (!newTarjeta.tipo)
      newErrors.tipo = "El tipo de tarjeta es obligatorio";
    
    if (!newTarjeta.tipo_documento)
      newErrors.tipo_documento = "Tipo de documento es obligatorio";
    
    if (!newTarjeta.numero_documento)
      newErrors.numero_documento = "Número de documento es obligatorio";      
    else if (newTarjeta.numero_documento.length !== 8) {
      newErrors.numero_documento = "El numero de documento debe tener 8 dígitos";
    }

    const [inputMonth] = newTarjeta.fecha_vencimiento
      .split("/")
      .map(Number);
    const today = new Date();
    const currentMonth = today.getMonth() + 1;

    if (
      (inputMonth < currentMonth)
    ) {
      newErrors.fecha_vencimiento = "La tarjeta ingresada está vencida.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddTarjeta = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      await createTarjeta(newTarjeta);
      onClose();
    } catch (err) {
      setErrors({ general: "Error al agregar la tarjeta" });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 px-2 transition-all duration-500 ease-in-out backdrop-blur-none hover:backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full gap-2 flex justify-center flex-col">
        <h2 className="text-2xl font-bold mb-4">Agregar Tarjeta</h2>
        {errors.general && <p className="text-red-500 font-semibold">{errors.general}</p>}
        {tarjetasError && <p className="text-red-500 font-semibold">{tarjetasError}</p>}

        {errors.numero_tarjeta && (<p className="text-red-500 font-semibold">{errors.numero_tarjeta}</p>)}
        <input
          type="text"
          name="numero_tarjeta"
          value={newTarjeta.numero_tarjeta}
          onChange={handleInputChange}
          placeholder="Número de tarjeta"
          className="block border-2 border-jade-300 rounded-2xl w-full p-2"
        />
        
        {errors.cvv && <p className="text-red-500 font-semibold">{errors.cvv}</p>}
        <input
          type="text"
          name="cvv"
          value={newTarjeta.cvv}
          onChange={handleInputChange}
          placeholder="CVV"
          className="block border-2 border-jade-300 rounded-2xl w-full p-2"
        />

        {errors.nombre_completo && (<p className="text-red-500 font-semibold">{errors.nombre_completo}</p>)}
        <input
          type="text"
          name="nombre_completo"
          value={newTarjeta.nombre_completo}
          onChange={handleInputChange}
          placeholder="Nombre completo"
          className="block border-2 border-jade-300 rounded-2xl w-full p-2"
        />

        {errors.fecha_vencimiento && (<p className="text-red-500 font-semibold">{errors.fecha_vencimiento}</p>)}
        <input
          type="month"
          name="fecha_vencimiento"
          min={obtenerFechaActual()}
          onChange={handleInputChange}
          className="block border-2 border-jade-300 rounded-2xl w-full p-2"
        />

        {errors.tipo && (<p className="text-red-500 font-semibold">{errors.tipo}</p>)}
        <select
          name="tipo"
          value={newTarjeta.tipo}
          onChange={handleInputChange}
          className="block border-2 border-jade-300 rounded-2xl w-full p-2"
        >
          <option value="">Selecciona el tipo de tarjeta</option>
          <option value="Debito">Débito</option>
          <option value="Credito">Crédito</option>
        </select>

        {errors.tipo_documento && (<p className="text-red-500 font-semibold">{errors.tipo_documento}</p>)}
        <select
          name="tipo_documento"
          value={newTarjeta.tipo_documento}
          onChange={handleInputChange}
          className="block border-2 border-jade-300 rounded-2xl w-full p-2"
        >
          <option value="">Selecciona un tipo de documento</option>
          <option value="DNI">DNI</option>
        </select>

        {errors.numero_documento && (<p className="text-red-500 font-semibold">{errors.numero_documento}</p>)}
        <input
          type="text"
          name="numero_documento"
          value={newTarjeta.numero_documento}
          onChange={handleInputChange}
          placeholder="Número de documento"
          maxLength={8}
          className="block border-2 border-jade-300 rounded-2xl w-full p-2"
        />

        <button
          onClick={handleAddTarjeta}
          className="bg-jade-700 text-white font-semibold py-2 px-4 rounded-lg w-full"
        >
          Agregar Tarjeta
        </button>
        <div className="flex justify-center items-center flex-row">
          <button
            onClick={onClose}
            className="mt-2 text-white p-2 px-4 font-semibold bg-jade-900 rounded-2xl text-center"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregarTarjeta;
