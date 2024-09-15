import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { Inventario } from './entities/inventario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventario])],
  providers: [InventarioService],
  controllers: [InventarioController]
})
export class InventarioModule {}
