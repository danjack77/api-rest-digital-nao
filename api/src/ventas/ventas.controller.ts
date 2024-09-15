import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { Venta } from './entities/venta.entity';

@Controller('ventas')
export class VentasController {
    constructor(private readonly ventasService: VentasService) {}

    @Get()
    async findAll(): Promise<{ mensaje: string; datos?: Venta[] }> {
        try {
            const ventas = await this.ventasService.findAll();
            return { mensaje: 'Ventas obtenidas exitosamente', datos: ventas };
        } catch (error) {
             throw new InternalServerErrorException('No se pudieron obtener las ventas');
        }
    }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ mensaje: string; datos?: Venta }> {
    try {
      const venta = await this.ventasService.findOne(+id);
      if (!venta) {
        throw new NotFoundException('Venta no encontrada');
      }
      return { mensaje: 'Venta obtenida exitosamente', datos: venta };
    } catch (error) {
        throw error;
    }
  }

  @Post()
  async create(@Body() venta: Venta): Promise<{ mensaje: string; datos?: Venta }> {
    try {
      const newVenta = await this.ventasService.create(venta);
      return { mensaje: 'Venta creada exitosamente', datos: newVenta };
    } catch (error) {
      throw new BadRequestException('No se pudo crear la venta');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() venta: Partial<Venta>): Promise<{ mensaje: string; datos?: Venta }> {
    try {
      const updatedVenta = await this.ventasService.update(+id, venta);
      if (!updatedVenta) {
        throw new NotFoundException('Venta no encontrada');
      }
      return { mensaje: 'Venta actualizada exitosamente', datos: updatedVenta };
    } catch (error) {
        throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ mensaje: string }> {
    try {
      await this.ventasService.remove(+id);
      return { mensaje: 'Venta eliminada exitosamente' };
    } catch (error) {
      throw new NotFoundException('Venta no encontrada');
    }
  }
}
