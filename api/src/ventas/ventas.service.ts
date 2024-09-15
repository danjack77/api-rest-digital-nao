import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';


@Injectable()
export class VentasService {

   constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    ) {}


    async findAll(): Promise<Venta[]> {
        return this.ventaRepository.find();
    }

    async findOne(id: number): Promise<Venta> {
        const venta = await this.ventaRepository.findOneBy({id});
        if (!venta) {
            throw new NotFoundException('Venta no encontrada');
        }
        return venta;
    }

    async create(createVentaDto: CreateVentaDto): Promise<Venta> {
        const venta = this.ventaRepository.create(createVentaDto);
        try {
            return await this.ventaRepository.save(venta);
        } catch (error) {
            throw new BadRequestException('Error al crear la venta');
        }
    }

    async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
        const venta = await this.findOne(id);
        if (!venta) {
            throw new NotFoundException('Venta no encontrada');
        }
        Object.assign(venta, updateVentaDto);
        try {
            return await this.ventaRepository.save(venta);
        } catch (error) {
            throw new BadRequestException('Error al actualizar la venta');
        }
    }

    async remove(id: number): Promise<void> {
        const venta = await this.findOne(id);
        if (!venta) {
            throw new NotFoundException('Venta no encontrada');
        }
        try {
            await this.ventaRepository.remove(venta);
        } catch (error) {
            throw new BadRequestException('Error al eliminar la venta');
        }
    }

}
