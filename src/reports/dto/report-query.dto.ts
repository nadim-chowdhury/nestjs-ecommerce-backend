import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class ReportQueryDto {
  @IsOptional()
  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsNotEmpty()
  type: string; // e.g., sales, payments
}
