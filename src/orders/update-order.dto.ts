export class UpdateOrderDto {
  readonly customer_id?: number;
  readonly inventory_id?: number;
  readonly store_id?: number;
  readonly quantity?: number;
  readonly status?: string;
  readonly create_date?: string;
  readonly update_date?: string;
}
