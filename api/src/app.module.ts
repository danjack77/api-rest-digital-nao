import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasModule } from './ventas/ventas.module';
import { InventarioModule } from './inventario/inventario.module';
import { SoporteModule } from './soporte/soporte.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Venta } from './ventas/entities/venta.entity';
import { Inventario } from './inventario/entities/inventario.entity';
import { Ticket } from './soporte/entities/ticket.entity';
import { Usuario } from './usuario/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'comercioDigital',
      entities: [Venta, Inventario, Ticket, Usuario],
      synchronize: false,
    }),
    VentasModule,
    InventarioModule,
    SoporteModule,
    UsuarioModule,
  ],
})
export class AppModule {}
