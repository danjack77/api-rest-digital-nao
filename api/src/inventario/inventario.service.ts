import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from './entities/inventario.entity';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';

@Injectable()
export class InventarioService {

    constructor(
        @InjectRepository(Inventario)
        private readonly inventarioRepository: Repository<Inventario>,
      ) {}
    
    async findAll(): Promise<Inventario[]> {
        return this.inventarioRepository.find();
    }

    async findOne(id: number): Promise<Inventario> {
        const inventario = await this.inventarioRepository.findOneBy({ id });
        if (!inventario) {
            throw new NotFoundException('Inventario no encontrado');
        }
        return inventario;
    }

    async create(createInventarioDto: CreateInventarioDto): Promise<Inventario> {
        try {
            const inventario = this.inventarioRepository.create(createInventarioDto);
            return await this.inventarioRepository.save(inventario);
        } catch (error) {
            throw new BadRequestException('No se pudo crear el inventario');
        }
    }

    async update(id: number, updateInventarioDto: UpdateInventarioDto): Promise<Inventario> {
        const inventario = await this.inventarioRepository.preload({
            id,
            ...updateInventarioDto,
        });
        if (!inventario) {
            throw new NotFoundException('Inventario no encontrado');
        }
        return this.inventarioRepository.save(inventario);
    }

    async remove(id: number): Promise<void> {
        const result = await this.inventarioRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Inventario no encontrado');
        }
    }
}
