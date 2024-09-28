import { ApiProperty } from '@nestjs/swagger';

export class ApproveSellerDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the seller to approve or reject',
  })
  sellerId: number;

  @ApiProperty({
    example: true,
    description: 'Approve (true) or reject (false) the seller',
  })
  approved: boolean;
}
