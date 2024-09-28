import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartItemDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Quantity of the item to update',
    example: 3,
  })
  quantity: number;
}
