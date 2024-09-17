import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
@Entity('tickets')
export class Ticket {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    cliente: string;
  
    @Column()
    asunto: string;
  
    @Column()
    descripcion: string;
  
    @Column()
    estado: string;
  
    @Column()
    fecha: Date;
  
    /*
    @ManyToOne(() => Usuario, usuario => usuario.tickets)
    usuario: Usuario;
    */


}