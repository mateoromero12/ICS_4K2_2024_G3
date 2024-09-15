const API_BASE_URL = "http://localhost:3000/api";

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

const fetchAPI = async (endpoint: string, options: FetchOptions = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const contentType = response.headers.get("Content-Type");
  let responseData;

  if (contentType && contentType.includes("application/json")) {
    responseData = await response.json();
  } else {
    responseData = await response.text();
  }

  if (!response.ok) {
    throw new Error(
      responseData.message || responseData || "Error en la solicitud"
    );
  }

  return responseData;
};

export const login = async (email: string, password: string) => {
  return fetchAPI("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const getDatosTransportistas = async (dador_id: number) => {
  return fetchAPI(`/transportistas/${dador_id}`);
};

export const getCotizacionPorDadorYTransportista = async (
  dador_id: number,
  id: number
) => {
  return fetchAPI(`/cotizaciones/${dador_id}/${id}`);
};

export const getMetodosPagoPorCotizacion = async (cotizacionId: number) => {
  return fetchAPI(`/cotizaciones/${cotizacionId}`);
};

export const createPago = async (pagoData: Record<string, any>) => {
  return fetchAPI("/pagos", {
    method: "POST",
    body: JSON.stringify(pagoData),
  });
};

export const getTarjetasByDador = async (dador_id: number) => {
  return fetchAPI(`/tarjetas/${dador_id}`);
};

export const getCotizacionesByTransportistaLogueadoPendientes = async (id: number) => {
  return fetchAPI(`/transportistas/logueado/pendientes/${id}`);
};

export const getCotizacionesByTransportistaLogueadoConfirmadas = async (id: number) => {
  return fetchAPI(`/transportistas/logueado/confirmadas/${id}`);
};

export const createTarjeta = async (tarjetaData: Record<string, any>) => {
  return fetchAPI("/tarjetas/agregar", {
    method: "POST",
    body: JSON.stringify(tarjetaData),
  });
};
