import { useState, useEffect } from 'react';
import { getMetodosPagoPorCotizacion } from '../Service/apiService';
import { MetodoPago } from '../Types/MetodoPago';
import { Cotizacion } from '../Types/Cotizacion';

const useMetodosPago = (cotizacion: Cotizacion | null) => {
  const [metodosPago, setMetodosPago] = useState<MetodoPago[]>([]);

  useEffect(() => {
    const fetchMetodosPago = async () => {
      if (cotizacion && cotizacion.id) {
        try {
          const metodos: MetodoPago[] = await getMetodosPagoPorCotizacion(cotizacion.id);
          setMetodosPago(metodos);
        } catch (error) {
          console.error("Error al obtener los métodos de pago:", error);
        }
      }
    };

    fetchMetodosPago();
  }, [cotizacion]);

  return { metodosPago };
};

export default useMetodosPago;
