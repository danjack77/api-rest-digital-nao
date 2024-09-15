import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateInventarioDto {
  @IsNotEmpty()
  @IsString()
  producto: string;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsNotEmpty()
  @IsNumber()
  precio: number;
}