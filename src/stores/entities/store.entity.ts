import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
  @IsNumber()
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  store_address: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  store_manager_name: string;
}
