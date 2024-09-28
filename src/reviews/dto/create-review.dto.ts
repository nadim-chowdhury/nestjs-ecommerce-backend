import { IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  @ApiProperty({
    description: 'Rating for the product (1-5)',
    minimum: 1,
    maximum: 5,
    example: 4,
  })
  rating: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Review comment for the product',
    example: 'This is a great product!',
  })
  comment: string;
}
