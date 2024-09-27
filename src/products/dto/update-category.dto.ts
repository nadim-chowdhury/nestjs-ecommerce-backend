import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    description: 'The updated name of the category',
    example: 'Electronics & Gadgets',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
