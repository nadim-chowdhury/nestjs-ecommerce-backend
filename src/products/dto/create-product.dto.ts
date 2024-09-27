import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'iPhone 12',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'A detailed description of the product',
    example: 'A high-end smartphone with 64GB of storage',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'The stock keeping unit (SKU) of the product',
    example: 'IPH12-64GB-BLK',
  })
  @IsNotEmpty()
  @IsString()
  sku: string;

  @ApiProperty({
    description: 'The ID of the category this product belongs to',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    description: 'The number of items available in stock',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  stockQuantity: number;

  @ApiPropertyOptional({
    description:
      'Bulk pricing details for the product, represented as a key-value pair',
    example: { '100': 95000, '500': 450000 },
  })
  bulkPricing?: Record<string, number>;
}
