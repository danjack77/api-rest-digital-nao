import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
      ) {}
    
    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }

    async findOne(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOneBy({ id });
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return usuario;
    }

    async findOneCorreo(correo: string): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOneBy({ correo });
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return usuario;
    }

    async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        try {
            const usuario = this.usuarioRepository.create(createUsuarioDto);
            return await this.usuarioRepository.save(usuario);
        } catch (error) {
            throw new BadRequestException('No se pudo crear el usuario');
        }
    }

    async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
        const usuario = await this.usuarioRepository.preload({
            id,
            ...updateUsuarioDto,
        });
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return this.usuarioRepository.save(usuario);
    }

    async remove(id: number): Promise<void> {
        const result = await this.usuarioRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Usuario no encontrado');
        }
    }
}
