export interface Tarjeta {
  id?: number;
  numero_tarjeta: string;
  tipo_documento: string;
  numero_documento: string;
  cvv: string;
  expiry: string;
  focus?: string;
  tipo: string;
  saldo?: string | null;   
  fecha_vencimiento?: string;
  nombre_completo?: string;
  dador_id: number;
}
