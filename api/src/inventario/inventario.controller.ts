import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { Inventario } from './entities/inventario.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('inventario')
@Controller('inventario')
export class InventarioController {

    constructor(private readonly inventarioService: InventarioService) {}

    @Get()
    async findAll(): Promise<{ mensaje: string; datos?: Inventario[] }> {
        try {
            const inventarios = await this.inventarioService.findAll();
             return { mensaje: 'Inventarios obtenidos exitosamente', datos: inventarios };
        } catch (error) {
          throw new InternalServerErrorException('No se pudieron obtener los inventarios');
        }
  }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<{ mensaje: string; datos?: Inventario }> {
        try {
            const inventario = await this.inventarioService.findOne(+id);
            if (!inventario) {
                throw new NotFoundException('Inventario no encontrado');
        }
        return { mensaje: 'Inventario obtenido exitosamente', datos: inventario };
        } catch (error) {
         throw error;
        }
    }

    @Post()
    async create(@Body() inventario: Inventario): Promise<{ mensaje: string; datos?: Inventario }> {
        try {
            const newInventario = await this.inventarioService.create(inventario);
            return { mensaje: 'Inventario creado exitosamente', datos: newInventario };
        } catch (error) {
             throw new BadRequestException('No se pudo crear el inventario');
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() inventario: Partial<Inventario>): Promise<{ mensaje: string; datos?: Inventario }> {
        try {
         const updatedInventario = await this.inventarioService.update(+id, inventario);
            if (!updatedInventario) {
                throw new NotFoundException('Inventario no encontrado');
            }
        return { mensaje: 'Inventario actualizado exitosamente', datos: updatedInventario };
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ mensaje: string }> {
        try {
            await this.inventarioService.remove(+id);
            return { mensaje: 'Inventario eliminado exitosamente' };
        } catch (error) {
         throw new NotFoundException('Inventario no encontrado');
        }
    }

}
