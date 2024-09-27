import { IsOptional, IsString, IsMobilePhone, IsEmail } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDeliveryPersonDto {
  @ApiPropertyOptional({
    description: 'The full name of the delivery person (optional)',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({
    description: 'The mobile number of the delivery person (optional)',
    example: '+919876543210',
  })
  @IsOptional()
  @IsMobilePhone('en-IN')
  mobileNumber?: string;

  @ApiPropertyOptional({
    description: 'The email of the delivery person (optional)',
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Vehicle details of the delivery person (optional)',
    example: 'Honda Activa, Red, DL-01-AB-1234',
  })
  @IsOptional()
  @IsString()
  vehicleDetails?: string;

  @ApiPropertyOptional({
    description: 'Profile picture URL of the delivery person (optional)',
    example: 'profile-pic-url.jpg',
  })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiPropertyOptional({
    description: 'ID proof URL of the delivery person (optional)',
    example: 'ID-proof-url.pdf',
  })
  @IsOptional()
  @IsString()
  idProof?: string;
}
