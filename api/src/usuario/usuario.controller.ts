import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, BadRequestException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('users')
@Controller('usuarios')
export class UsuarioController {
    
    constructor(private readonly usuarioService: UsuarioService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<{ mensaje: string; datos?: Usuario[] }> {
        try {
            const usuarios = await this.usuarioService.findAll();
            return { mensaje: 'Usuarios obtenidos exitosamente', datos: usuarios };
        } catch (error) {
            throw new InternalServerErrorException('No se pudieron obtener los usuarios');
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<{ mensaje: string; datos?: Usuario }> {
        try {
        const usuario = await this.usuarioService.findOne(+id);
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return { mensaje: 'Usuario obtenido exitosamente', datos: usuario };
        } catch (error) {
            throw error;
        }
    }

    @Get(':correo')
    async findOneCorreo(@Param('correo') correo: string): Promise<{ mensaje: string; datos?: Usuario }> {
        try {
        const usuario = await this.usuarioService.findOne(+correo);
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return { mensaje: 'Usuario obtenido exitosamente', datos: usuario };
        } catch (error) {
            throw error;
        }
    }

    @Post()
    async create(@Body() usuario: Usuario): Promise<{ mensaje: string; datos?: Usuario }> {
        try {
        const newUsuario = await this.usuarioService.create(usuario);
        return { mensaje: 'Usuario creado exitosamente', datos: newUsuario };
        } catch (error) {
            throw new BadRequestException('No se pudo crear el usuario');
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() usuario: Partial<Usuario>): Promise<{ mensaje: string; datos?: Usuario }> {
        try {
        const updatedUsuario = await this.usuarioService.update(+id, usuario);
        if (!updatedUsuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return { mensaje: 'Usuario actualizado exitosamente', datos: updatedUsuario };
        } catch (error) {
             throw error;
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ mensaje: string }> {
        try {
        await this.usuarioService.remove(+id);
        return { mensaje: 'Usuario eliminado exitosamente' };
        } catch (error) {
            throw new NotFoundException('Usuario no encontrado');
        }
    }

}
