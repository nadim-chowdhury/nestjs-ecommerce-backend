import { IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  @ApiProperty({
    description: 'Updated rating for the product (1-5)',
    minimum: 1,
    maximum: 5,
    example: 5,
  })
  rating: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Updated review comment for the product',
    example: 'This product is even better now!',
  })
  comment: string;
}
