import { ApiProperty } from '@nestjs/swagger';

export class Admin {
  @ApiProperty({
    example: 1,
    description: 'The unique ID of the admin user',
  })
  id: number;

  @ApiProperty({
    example: 'admin',
    description: 'The username of the admin',
  })
  username: string;

  @ApiProperty({
    example: true,
    description: 'Permission to approve sellers',
  })
  canApproveSellers: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to manage inventory',
  })
  canManageInventory: boolean;
}
