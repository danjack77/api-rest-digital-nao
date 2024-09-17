import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity('ventas')
export class Venta{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    cliente: string;
  
    @Column('decimal')
    total: number;
  
    @Column()
    fecha: Date;
  
    /*
    @ManyToOne(() => Usuario, usuario => usuario.ventas)
    usuario: Usuario;
    */
}