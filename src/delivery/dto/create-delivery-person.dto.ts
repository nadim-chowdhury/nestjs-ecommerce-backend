import {
  IsNotEmpty,
  IsString,
  IsMobilePhone,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryPersonDto {
  @ApiProperty({
    description: 'The full name of the delivery person',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'The mobile number of the delivery person',
    example: '+919876543210',
  })
  @IsNotEmpty()
  @IsMobilePhone('en-IN')
  mobileNumber: string;

  @ApiProperty({
    description: 'The email of the delivery person (optional)',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Vehicle details of the delivery person (optional)',
    example: 'Honda Activa, Red, DL-01-AB-1234',
    required: false,
  })
  @IsOptional()
  @IsString()
  vehicleDetails?: string;

  @ApiProperty({
    description: 'Profile picture URL of the delivery person (optional)',
    example: 'profile-pic-url.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({
    description: 'ID proof URL of the delivery person (optional)',
    example: 'ID-proof-url.pdf',
    required: false,
  })
  @IsOptional()
  @IsString()
  idProof?: string;
}
