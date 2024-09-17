import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Ticket } from 'src/soporte/entities/ticket.entity';

@Entity('usuarios')
export class Usuario{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  password: string;

  @Column()
  rol: string; 

  /*
  @OneToMany(() => Venta, venta => venta.usuario)
  ventas: Venta[];

  @OneToMany(() => Ticket, ticket => ticket.usuario)
  tickets: Ticket[];*/

}