import { useState, useEffect, useCallback, useRef } from 'react';
import Swal from 'sweetalert2';
import { getCotizacionesByTransportistaLogueadoPendientes, getCotizacionesByTransportistaLogueadoConfirmadas, enviarCorreoNuevaCotizacion } from '../Service/apiService';
import { Cotizacion } from '../Types/Cotizacion';
import useAuth from './useAuth';

const usePedidosTransportista = (id: number) => {
  const { user } = useAuth();
  const [cotizacionesTransportistaLogueadoPendiente, setCotizacionTransportistaLogueadoPendiente] = useState<Cotizacion[]>([]);
  const [cotizacionesTransportistaLogueadoConfirmado, setCotizacionTransportistaLogueadoConfirmado] = useState<Cotizacion[]>([]);

  const prevCotizacionesConfirmadas = useRef<Cotizacion[]>([]);

  const cargarCotizacionesPrevias = () => {
    const cotizacionesPrevias = localStorage.getItem('cotizacionesConfirmadas');
    return cotizacionesPrevias ? JSON.parse(cotizacionesPrevias) : [];
  };

  const guardarCotizacionesPrevias = (cotizaciones: Cotizacion[]) => {
    localStorage.setItem('cotizacionesConfirmadas', JSON.stringify(cotizaciones));
  };

  const obtenerCotizacionesPendientes = useCallback(async () => {
    if (id === 0) return;
    try {
      const datos = await getCotizacionesByTransportistaLogueadoPendientes(id);
      setCotizacionTransportistaLogueadoPendiente(datos);
    } catch (error) {
      console.error('Error al obtener cotizaciones pendientes:', error);
    }
  }, [id]);

  const obtenerCotizacionesConfirmadas = useCallback(async () => {
    if (id === 0) return;
    try {
      const datos = await getCotizacionesByTransportistaLogueadoConfirmadas(id);
      const cotizacionesPrevias = cargarCotizacionesPrevias();

      const nuevasCotizaciones = datos.filter(
        (cotizacion: Cotizacion) => !cotizacionesPrevias.some((prevCotizacion: Cotizacion) => prevCotizacion.id === cotizacion.id)
      );

      if (nuevasCotizaciones.length > 0) {
        nuevasCotizaciones.forEach(async (cotizacion: Cotizacion) => {
          try {
            await enviarCorreoNuevaCotizacion(user?.email ?? '', cotizacion);
          } catch (error) {
            console.error('Error al enviar el correo:', error);
          }
        });

        Swal.fire({
          title: 'Nueva Cotización Confirmada',
          text: `Tienes ${nuevasCotizaciones.length} nueva(s) cotización(es) confirmada(s).`,
          icon: 'info',
          confirmButtonText: 'OK',
          timer: 2000,
          timerProgressBar: true,
        });
      }

      guardarCotizacionesPrevias(datos);
      prevCotizacionesConfirmadas.current = datos;
      setCotizacionTransportistaLogueadoConfirmado(datos);
    } catch (error) {
      console.error('Error al obtener cotizaciones confirmadas:', error);
    }
  }, [id, user?.email]);

  useEffect(() => {
    obtenerCotizacionesPendientes();
    obtenerCotizacionesConfirmadas();
  }, [id, obtenerCotizacionesPendientes, obtenerCotizacionesConfirmadas]);

  return {
    cotizacionesTransportistaLogueadoPendiente,
    cotizacionesTransportistaLogueadoConfirmado,
    obtenerCotizacionesPendientes,
    obtenerCotizacionesConfirmadas,
  };
};

export default usePedidosTransportista;
