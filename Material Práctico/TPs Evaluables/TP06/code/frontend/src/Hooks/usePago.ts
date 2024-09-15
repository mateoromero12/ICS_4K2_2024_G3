import { useState } from "react";
import { createPago } from "../Service/apiService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PagoData } from "../Types/PagoData";

const usePago = (transportistaId: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const procesarPago = async (pagoData: PagoData) => {
    setLoading(true);
    setError(null);

    try {
      await createPago(pagoData);

      Swal.fire({
        title: "<h2 class='text-jade-200 text-2xl font-bold'>Pago realizado con éxito</h2>",
        html: "<p class='text-jade-50 font-semibold'>Serás redirigido en breve...</p>",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
        background: '#03045E',
        customClass: {
          popup: 'bg-jade-50 shadow-lg',
          title: 'text-jade-700',
          htmlContainer: 'text-jade-500',
        },
      });

      setTimeout(() => {
        navigate("/dador");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Error al procesar el pago");
      Swal.fire({
        title: "<h2 class='text-red-950 text-3xl font-bold'>Error</h2>",
        html: "<p class='text-red-500'>Ocurrió un problema al procesar el pago.</p>",
        icon: "error",
        background: '#FFEBEE',
        customClass: {
          popup: 'bg-red-100 shadow-lg',
          title: 'text-red-600',
          htmlContainer: 'text-red-400',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, procesarPago };
};

export default usePago;
