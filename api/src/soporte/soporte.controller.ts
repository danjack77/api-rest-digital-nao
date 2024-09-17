import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { SoporteService } from './soporte.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/udpate-ticket.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Soporte')
@Controller('soporte')
export class SoporteController {

    constructor(private readonly soporteService: SoporteService) {}

   
    @Get()
    async findAll(): Promise<{ mensaje: string; datos?: Ticket[] }> {
        try {
            const tickets = await this.soporteService.findAll();
            return { mensaje: 'Tickets obtenidos exitosamente', datos: tickets };
        } catch (error) {
            throw new InternalServerErrorException('No se pudieron obtener los tickets');
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<{ mensaje: string; datos?: Ticket }> {
        try {
            const ticket = await this.soporteService.findOne(+id);
            if (!ticket) {
                throw new NotFoundException('Ticket no encontrado');
            }
            return { mensaje: 'Ticket obtenido exitosamente', datos: ticket };
        } catch (error) {
            throw error;
        }
    }

    @Post()
    async create(@Body() createTicketDto: CreateTicketDto): Promise<{ mensaje: string; datos?: Ticket }> {
        try {
            const newTicket = await this.soporteService.create(createTicketDto);
            return { mensaje: 'Ticket creado exitosamente', datos: newTicket };
        } catch (error) {
            throw new BadRequestException('No se pudo crear el ticket');
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto): Promise<{ mensaje: string; datos?: Ticket }> {
        try {
            const updatedTicket = await this.soporteService.update(+id, updateTicketDto);
            if (!updatedTicket) {
                throw new NotFoundException('Ticket no encontrado');
            }
            return { mensaje: 'Ticket actualizado exitosamente', datos: updatedTicket };
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ mensaje: string }> {
        try {
            await this.soporteService.remove(+id);
            return { mensaje: 'Ticket eliminado exitosamente' };
        } catch (error) {
            throw new NotFoundException('Ticket no encontrado');
        }
    }

}
