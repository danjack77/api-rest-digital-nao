import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inventario')
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  producto: string;

  @Column('int')
  cantidad: number;

  @Column('decimal')
  precio: number;
}