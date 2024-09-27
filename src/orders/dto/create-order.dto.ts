import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @ApiProperty({
    description: 'List of items included in the order',
    type: [CreateOrderItemDto],
  })
  @IsArray()
  items: CreateOrderItemDto[];

  @ApiProperty({
    description: 'Total cost of the order',
    example: 99.99,
  })
  @IsNotEmpty()
  @IsNumber()
  total: number;
}
