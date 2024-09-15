import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateInventarioDto {
  @IsOptional()
  @IsString()
  producto?: string;

  @IsOptional()
  @IsNumber()
  cantidad?: number;

  @IsOptional()
  @IsNumber()
  precio?: number;
}