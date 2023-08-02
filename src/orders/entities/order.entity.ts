import {
  IsString,
  IsNumber,
  IsNotEmpty,
  isNumber,
  IsDate,
} from '@nestjs/class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @IsNumber()
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  customer_id: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  inventory_id: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  store_id: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  status: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  create_date: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  update_date: string;
}
