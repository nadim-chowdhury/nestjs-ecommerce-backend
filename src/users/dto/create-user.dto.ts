import { IsEmail, IsNotEmpty, IsString, IsMobilePhone } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The mobile number of the user',
    example: '9876543210',
  })
  @IsNotEmpty()
  @IsMobilePhone('en-IN')
  mobileNumber: string;

  @ApiProperty({
    description: 'The password for the user (optional)',
    example: 'StrongPassword123!',
    required: false,
  })
  @IsString()
  password?: string;
}
