import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VentasModule } from './ventas/ventas.module';
import { InventarioModule } from './inventario/inventario.module';
import { SoporteModule } from './soporte/soporte.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [VentasModule, InventarioModule, SoporteModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
