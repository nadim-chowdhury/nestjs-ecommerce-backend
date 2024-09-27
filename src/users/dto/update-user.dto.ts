import { IsEmail, IsOptional, IsString, IsMobilePhone } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'The email of the user',
    example: 'johndoe@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'The mobile number of the user',
    example: '9876543210',
  })
  @IsOptional()
  @IsMobilePhone('en-IN')
  mobileNumber?: string;

  @ApiPropertyOptional({
    description: 'The password for the user',
    example: 'StrongPassword123!',
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;
}
