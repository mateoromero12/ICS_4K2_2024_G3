import { useState, useEffect } from 'react';
import { getDatosTransportistas } from '../Service/apiService';
import { Transportista } from '../Types/Transportista';

const useTransportista = (dador_id: number) => {
  const [transportistaDatos, setTransportistaDatos] = useState<Transportista[]>([]);

  useEffect(() => {
    if (dador_id === 0) return;  // ver problema de respuetsa de la api
    const obtenerDatos = async () => {
      try {
        const datos = await getDatosTransportistas(dador_id);
        setTransportistaDatos(datos);
      } catch (error) {
        console.error('Error al obtener transportistas:', error);
      }
    };
  
    obtenerDatos();
  }, [dador_id]);
  

  return { transportistaDatos };
};

export default useTransportista;
