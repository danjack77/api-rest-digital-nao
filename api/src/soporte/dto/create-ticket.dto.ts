import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTicketDto {
    @IsString()
    @IsNotEmpty()
    cliente: string;

    @IsString()
    @IsNotEmpty()
    asunto: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsString()
    @IsNotEmpty()
    estado: string;

    @IsDate()
    fecha: Date;
}