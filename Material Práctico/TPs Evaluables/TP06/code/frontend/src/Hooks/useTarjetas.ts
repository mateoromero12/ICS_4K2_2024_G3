import { useState, useEffect, useCallback } from "react";
import { getTarjetasByDador, createTarjeta as createTarjetaAPI } from "../Service/apiService";
import { Tarjeta } from "../Types/Tarjeta";

const useTarjetas = (dador_id: number) => {
  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTarjetas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTarjetasByDador(dador_id);
      setTarjetas(response);
    } catch (err: any) {
      setError(err.message || "Error al obtener las tarjetas");
    } finally {
      setLoading(false);
    }
  }, [dador_id]);

  useEffect(() => {
    fetchTarjetas(); 
  }, [fetchTarjetas]);

  const createTarjeta = async (tarjetaData: Tarjeta) => {
    setLoading(true);
    setError(null);
    try {
      await createTarjetaAPI(tarjetaData);
    } catch (err: any) {
      setError(err.message || "Error al agregar la tarjeta");
    } finally {
      setLoading(false);
    }
  };

  return { tarjetas, loading, error, createTarjeta, fetchTarjetas }; 
};

export default useTarjetas;
