import { IsNumber, IsOptional, IsString, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'The updated name of the product',
    example: 'iPhone 12 Pro',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'The updated description of the product',
    example: 'A high-end smartphone with 128GB of storage',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'The updated price of the product',
    example: 1099.99,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    description: 'The updated stock keeping unit (SKU) of the product',
    example: 'IPH12PRO-128GB-BLK',
  })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiPropertyOptional({
    description: 'The updated category ID this product belongs to',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiPropertyOptional({
    description: 'The updated quantity of the product available in stock',
    example: 150,
  })
  @IsOptional()
  @IsNumber()
  stockQuantity?: number;

  @ApiPropertyOptional({
    description: 'The updated bulk pricing details for the product',
    example: { '100': 94000, '500': 440000 },
  })
  @IsOptional()
  @IsObject()
  bulkPricing?: Record<string, number>;

  @ApiPropertyOptional({
    description: 'The updated weight of the product in kilograms',
    example: '1.8',
  })
  @IsOptional()
  @IsString()
  weight?: string;

  @ApiPropertyOptional({
    description: 'The updated condition of the product',
    example: 'Refurbished',
  })
  @IsOptional()
  @IsString()
  condition?: string;
}
