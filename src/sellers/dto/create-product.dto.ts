import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  condition: string;

  @IsNotEmpty()
  @IsString()
  weight: string;

  @IsString()
  frontPhoto?: string;

  @IsString()
  rightPhoto?: string;

  @IsString()
  backPhoto?: string;
}
