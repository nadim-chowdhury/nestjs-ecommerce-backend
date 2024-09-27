import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'ID of the product being ordered',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: 'Quantity of the product being ordered',
    example: 3,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
