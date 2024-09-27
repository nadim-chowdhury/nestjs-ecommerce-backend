import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReportQueryDto {
  @ApiProperty({
    example: '2024-01-01',
    description: 'Start date for the report query (optional)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsDateString()
  startDate: string;

  @ApiProperty({
    example: '2024-01-31',
    description: 'End date for the report query (optional)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsDateString()
  endDate: string;

  @ApiProperty({
    example: 'sales',
    description: 'Type of report to generate (e.g., sales, payments)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  type: string;
}
