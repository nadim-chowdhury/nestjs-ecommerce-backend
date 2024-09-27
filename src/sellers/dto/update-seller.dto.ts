import { IsOptional, IsString, IsMobilePhone, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSellerDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the seller',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The email of the seller',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: '+919876543210',
    description: 'The mobile number of the seller',
    required: false,
  })
  @IsOptional()
  @IsMobilePhone('en-IN')
  mobileNumber?: string;

  @ApiProperty({
    example: '27ABCDE1234F2Z5',
    description: 'GSTIN of the seller',
    required: false,
  })
  @IsOptional()
  @IsString()
  gstin?: string;

  @ApiProperty({
    example: 'Udyam123456',
    description: 'Udyam registration number',
    required: false,
  })
  @IsOptional()
  @IsString()
  udyamRegistrationNumber?: string;

  @ApiProperty({
    example: 'shop-front.jpg',
    description: 'Front photo of the shop',
    required: false,
  })
  @IsOptional()
  @IsString()
  shopFrontPhoto?: string;

  @ApiProperty({
    example: 'shop-right.jpg',
    description: 'Right side photo of the shop',
    required: false,
  })
  @IsOptional()
  @IsString()
  shopRightPhoto?: string;

  @ApiProperty({
    example: 'shop-street.jpg',
    description: 'Street photo of the shop',
    required: false,
  })
  @IsOptional()
  @IsString()
  shopStreetPhoto?: string;
}
