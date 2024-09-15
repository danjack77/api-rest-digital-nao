import { IsString, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVentaDto {
  @IsNotEmpty()
  @IsString()
  cliente: string;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsDate()
  fecha: Date;
}