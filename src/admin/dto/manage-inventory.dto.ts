import { ApiProperty } from '@nestjs/swagger';

export class ManageInventoryDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the product to update inventory for',
  })
  productId: number;

  @ApiProperty({
    example: 100,
    description: 'The updated quantity of the product in stock',
  })
  quantity: number;
}
