import { IsString, IsNumber, IsNotEmpty } from '@nestjs/class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  readonly customer_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly inventory_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly store_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @IsString()
  @IsNotEmpty()
  readonly create_date: string;

  @IsString()
  @IsNotEmpty()
  readonly update_date: string;
}
