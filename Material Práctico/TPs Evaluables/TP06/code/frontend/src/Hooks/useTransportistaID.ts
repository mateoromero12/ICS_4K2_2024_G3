import { useState, useEffect } from 'react';
import { getCotizacionPorDadorYTransportista } from '../Service/apiService';
import { Cotizacion } from '../Types/Cotizacion'; 

const useTransportistaID = (id: number | undefined, dador_id: number) => {
  const [cotizacion, setCotizacion] = useState<Cotizacion | null>(null); 

  useEffect(() => {
    const fetchCotizacion = async () => {
      try {
        if (id && dador_id) {
          const cotizacionDatos: Cotizacion = await getCotizacionPorDadorYTransportista(dador_id, id);
          setCotizacion(cotizacionDatos);
        }
      } catch (error) {
        console.error('Error al obtener la cotización:', error);
      }
    };

    fetchCotizacion();
  }, [id, dador_id]);

  return { cotizacion };
};

export default useTransportistaID;
