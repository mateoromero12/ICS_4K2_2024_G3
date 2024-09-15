import React, { useState, ChangeEvent, FocusEvent } from "react";
import { useLocation } from "react-router-dom";
import usePago from "../../Hooks/usePago";
import { Cotizacion } from "../../Types/Cotizacion";
import { MetodoPago } from "../../Types/MetodoPago";
import { Tarjeta } from "../../Types/Tarjeta";
import DetallesCotizacion from "./DetallesCotizacion";
import FormasPago from "./FormasPago";
import InformacionTarjeta from "./InformacionTarjeta";
import PagoEfectivo from "./PagoEfectivo";
import { Focused } from "react-credit-cards-2";
import useTarjetas from "../../Hooks/useTarjetas";
import ModalAgregarTarjeta from "./ModalAgregarTarjeta";
import { MdError } from "react-icons/md";

const InterfazPago: React.FC = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState<boolean>(false); 
  const { cotizacion, metodosPago, dador_id } = location.state as {cotizacion: Cotizacion; metodosPago: MetodoPago[]; dador_id: number;};
  const [error, setError] = useState<string>("");
  const [formaPagoSeleccionada, setFormaPagoSeleccionada] = useState<string>("");
  const [tarjeta, setTarjeta] = useState<Tarjeta>({
    numero_tarjeta: "",
    nombre_completo: "",
    tipo_documento: "",
    numero_documento: "",
    cvv: "",
    expiry: "",
    focus: "",
    tipo: "",
    saldo: "",
    dador_id: dador_id,
  });
  const [efectivo, setEfectivo] = useState<string>("");
  const { loading, procesarPago } = usePago(cotizacion.transportista_id);
  const { tarjetas, loading: tarjetasLoading, error: tarjetasError, fetchTarjetas } = useTarjetas(dador_id);   

  const handleFormaPagoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormaPagoSeleccionada(e.target.value);
    setError("");
  };

  const handleTarjetaSeleccionada = (e: ChangeEvent<HTMLSelectElement>) => {
    const tarjetaSeleccionada = tarjetas.find((tarjeta) => tarjeta.id === parseInt(e.target.value));
    if (!tarjetaSeleccionada) return;

    const fechaFormateada = tarjetaSeleccionada.fecha_vencimiento
      ? `${tarjetaSeleccionada.fecha_vencimiento.slice(0, 2)}${tarjetaSeleccionada.fecha_vencimiento.slice(2)}`
      : "";

    setTarjeta({
      numero_tarjeta: tarjetaSeleccionada.numero_tarjeta,
      nombre_completo: tarjetaSeleccionada.nombre_completo,
      tipo_documento: tarjetaSeleccionada.tipo_documento,
      numero_documento: tarjetaSeleccionada.numero_documento,
      tipo: tarjetaSeleccionada.tipo,
      saldo: tarjetaSeleccionada.saldo,
      cvv: tarjetaSeleccionada.cvv,
      expiry: fechaFormateada,
      focus: "",
      dador_id: dador_id,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTarjeta((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    setTarjeta({
      ...tarjeta,
      focus: e.target.name as Focused,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formaPagoSeleccionada) {
      setError("Debe seleccionar una forma de pago.");
      return;
    }

    if (formaPagoSeleccionada === "Tarjeta" && (!tarjeta.numero_tarjeta || tarjeta.numero_tarjeta === "")) {
      setError("Debe seleccionar una tarjeta.");
      return;
    }

    const importeCotizacion = cotizacion.importe ?? 0;
    const saldoTarjeta = tarjeta.saldo ?? "0";

    const saldoTarjetaNumerico = parseFloat(saldoTarjeta);
    const importeCotizacionNumerico = parseFloat(importeCotizacion.toString());

    if (formaPagoSeleccionada === "Tarjeta" && (tarjeta.tipo === "Debito" || tarjeta.tipo === "Credito") && saldoTarjetaNumerico < importeCotizacionNumerico) {
      setError("Saldo insuficiente en la tarjeta.");
      return;
    }
    
    if (
      (formaPagoSeleccionada === "Contado al retirar" || formaPagoSeleccionada === "Contado contra entrega") &&
      efectivo < importeCotizacion
    ) {
      setError("El monto en efectivo es insuficiente para cubrir el importe.");
      return;
    }

    let pagoData: any = {
      cotizacion_id: cotizacion.id,
      forma_pago_id: metodosPago.find((metodo) => metodo.descripcion === formaPagoSeleccionada)?.id,
      importe_a_pagar: importeCotizacion,
      dador_id: dador_id,
    };

    if (formaPagoSeleccionada === "Tarjeta") {
      pagoData = {
        ...pagoData,
        numero_tarjeta: tarjeta.numero_tarjeta,
        nombre_completo: tarjeta.nombre_completo,
        tipo_documento: tarjeta.tipo_documento,
        numero_documento: tarjeta.numero_documento,
        tipo: tarjeta.tipo,
        saldo: tarjeta.saldo,
      };
    }

    await procesarPago(pagoData);
  };

  const handleModalClose = () => {
    setShowModal(false);
    fetchTarjetas();
  };

  const handleEfectivoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
        if (/^\d*$/.test(valor)) {
      setEfectivo(valor);
    }
  };

  return (
    <div className="bg-jade-900 min-h-screen flex justify-center items-center p-4 sm:p-8">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-8">
        <h1 className="text-3xl font-bold text-jade-700 text-center mb-6">
          Selecciona tu forma de pago
        </h1>

        <DetallesCotizacion cotizacion={cotizacion} />
        <FormasPago metodosPago={metodosPago} formaPagoSeleccionada={formaPagoSeleccionada} onFormaPagoChange={handleFormaPagoChange}/>

        {formaPagoSeleccionada === "Tarjeta" && (
          <>
            <h2 className="text-xl mt-3 mb-1 font-semibold text-jade-600">
              Selecciona una tarjeta guardada
            </h2>
            {tarjetasLoading ? (
              <p>Cargando tarjetas...</p>
            ) : tarjetasError ? (
              <p className="text-red-500">{tarjetasError}</p>
            ) : tarjetas.length === 0 ? (
              <p>No posee tarjetas cargadas</p>
            ) : (
              <select
                onChange={handleTarjetaSeleccionada}
                className="block w-full p-2 border border-gray-300 rounded-lg mb-4"
              >
                <option value="">Seleccione una tarjeta</option>
                {tarjetas.map((tarjeta) => (
                  <option key={tarjeta.id} value={tarjeta.id}>
                    {tarjeta.tipo} - {tarjeta.numero_tarjeta.slice(-4)}
                  </option>
                ))}
              </select>
            )}

            <button onClick={() => setShowModal(true)} className="mt-4 bg-jade-600 text-white px-4 py-2 rounded-lg">Agregar nueva tarjeta</button>
            {showModal && (<ModalAgregarTarjeta dador_id={dador_id} onClose={handleModalClose} />)}

            <InformacionTarjeta tarjeta={tarjeta} handleInputChange={handleInputChange} handleInputFocus={handleInputFocus}/>
          </>
        )}

        {(formaPagoSeleccionada === "Contado al retirar" ||
          formaPagoSeleccionada === "Contado contra entrega") && (
          <PagoEfectivo efectivo={efectivo} onEfectivoChange={handleEfectivoChange} />
        )}

        <div className="mt-8">
          <button onClick={handleSubmit} className="bg-jade-700 text-white font-semibold rounded-full py-3 px-6 text-lg uppercase w-full hover:bg-jade-600 transition-all duration-300 ease-in-out" disabled={loading}>
            {loading ? "Procesando..." : "Procesar Pago"}
          </button>
          {error && (
            <div className="bg-red-600 text-white rounded-full font-semibold text-center py-2 px-4 mt-4 flex items-center gap-2">
              <MdError className="text-xl"/>
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterfazPago;
