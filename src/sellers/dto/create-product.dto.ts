import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'The name of the product' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'The category of the product',
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    example: 'A high-performance laptop',
    description: 'Product description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 100, description: 'Quantity in stock' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 'Dell', description: 'The brand of the product' })
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty({ example: 'New', description: 'Condition of the product' })
  @IsNotEmpty()
  @IsString()
  condition: string;

  @ApiProperty({ example: '1.5kg', description: 'Weight of the product' })
  @IsNotEmpty()
  @IsString()
  weight: string;

  @ApiProperty({
    example: 'front.jpg',
    description: 'Front photo of the product',
    required: false,
  })
  @IsString()
  frontPhoto?: string;

  @ApiProperty({
    example: 'right.jpg',
    description: 'Right side photo of the product',
    required: false,
  })
  @IsString()
  rightPhoto?: string;

  @ApiProperty({
    example: 'back.jpg',
    description: 'Back photo of the product',
    required: false,
  })
  @IsString()
  backPhoto?: string;
}
