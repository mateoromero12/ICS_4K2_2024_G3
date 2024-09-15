export interface PagoData {
  cotizacion_id: number;
  forma_pago_id: number;
  importe_a_pagar: number;
  numero_tarjeta?: string;
  nombre_completo?: string;
  tipo_documento?: string;
  numero_documento?: string;
  tipo?: string;
  saldo?: string;
}