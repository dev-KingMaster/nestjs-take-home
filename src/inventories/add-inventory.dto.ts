import { IsString, IsNumber, IsNotEmpty } from '@nestjs/class-validator';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  readonly inventory_name: string;

  @IsString()
  @IsNotEmpty()
  readonly manufacture_date: string;

  @IsNumber()
  @IsNotEmpty()
  readonly available_quantity: number;
}
