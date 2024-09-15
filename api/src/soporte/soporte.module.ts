import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoporteService } from './soporte.service';
import { SoporteController } from './soporte.controller';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [SoporteService],
  controllers: [SoporteController]
})
export class SoporteModule {}
