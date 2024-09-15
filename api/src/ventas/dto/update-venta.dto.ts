import { IsString, IsDate, IsOptional, IsNumber } from 'class-validator';

export class UpdateVentaDto {
  @IsOptional()
  @IsString()
  cliente?: string;

  @IsOptional()
  @IsNumber()
  total?: number;

  @IsOptional()
  @IsDate()
  fecha?: Date;
}