import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'The status of the order',
    example: 'shipped',
    enum: ['placed', 'shipped', 'delivered', 'cancelled', 'returned'],
  })
  @IsOptional()
  @IsString()
  status?: string;
}
