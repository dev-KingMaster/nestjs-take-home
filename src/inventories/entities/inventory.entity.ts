import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory {
  @IsNumber()
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  inventory_name: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  manufacture_date: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  available_quantity: number;
}
