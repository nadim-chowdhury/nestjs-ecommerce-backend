import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Laptop',
    description: 'The name of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'The category of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    example: 'A high-performance laptop',
    description: 'Product description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 100,
    description: 'Quantity in stock',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty({
    example: 'Dell',
    description: 'The brand of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({
    example: 'New',
    description: 'Condition of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  condition?: string;

  @ApiProperty({
    example: '1.5kg',
    description: 'Weight of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  weight?: string;

  @ApiProperty({
    example: 'front.jpg',
    description: 'Front photo of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  frontPhoto?: string;

  @ApiProperty({
    example: 'right.jpg',
    description: 'Right side photo of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  rightPhoto?: string;

  @ApiProperty({
    example: 'back.jpg',
    description: 'Back photo of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  backPhoto?: string;
}
