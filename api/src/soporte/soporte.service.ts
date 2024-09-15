import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/udpate-ticket.dto';

@Injectable()
export class SoporteService {

    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>,
      ) {}
    
      async findAll(): Promise<Ticket[]> {
        return this.ticketRepository.find();
    }

    async findOne(id: number): Promise<Ticket> {
        const ticket = await this.ticketRepository.findOneBy({ id });
        if (!ticket) {
            throw new NotFoundException('Ticket no encontrado');
        }
        return ticket;
    }

    async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
        try {
            const ticket = this.ticketRepository.create(createTicketDto);
            return await this.ticketRepository.save(ticket);
        } catch (error) {
            throw new BadRequestException('No se pudo crear el ticket');
        }
    }

    async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
        const ticket = await this.ticketRepository.preload({
            id,
            ...updateTicketDto,
        });
        if (!ticket) {
            throw new NotFoundException('Ticket no encontrado');
        }
        return this.ticketRepository.save(ticket);
    }

    async remove(id: number): Promise<void> {
        const result = await this.ticketRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Ticket no encontrado');
        }
    }
}
