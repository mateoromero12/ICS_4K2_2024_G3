export interface Cotizacion {
    id: number;
    usuario_id: number;
    dador_id: number;
    imagen: string;
    calificacion: string;
    transportista_id: number;
    fecha_retiro: string;
    fecha_entrega: string;
    importe: string | null;
    estado: "Pendiente" | "Confirmado";
  }