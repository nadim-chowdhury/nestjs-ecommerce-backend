import { ApiProperty } from '@nestjs/swagger';

export class ApproveDeliveryPersonDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the delivery person to approve or reject',
  })
  deliveryPersonId: number;

  @ApiProperty({
    example: true,
    description: 'Approve (true) or reject (false) the delivery person',
  })
  approved: boolean;
}
