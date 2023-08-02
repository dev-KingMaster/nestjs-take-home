import { IsString, IsNumber, IsNotEmpty } from '@nestjs/class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  readonly store_address: string;

  @IsString()
  @IsNotEmpty()
  readonly store_manager_name: string;
}
