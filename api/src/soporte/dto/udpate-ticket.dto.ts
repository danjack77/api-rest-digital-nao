import { IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateTicketDto {
    @IsString()
    @IsOptional()
    cliente?: string;

    @IsString()
    @IsOptional()
    asunto?: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsString()
    @IsOptional()
    estado?: string;

    @IsDate()
    @IsOptional()
    fecha?: Date;
}