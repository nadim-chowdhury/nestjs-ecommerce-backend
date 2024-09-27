import { IsEmail, IsNotEmpty, IsString, IsMobilePhone } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class OtpDto {
  @ApiProperty({ example: '9876543210' })
  @IsMobilePhone('en-IN')
  mobileNumber: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  otp: string;
}

export class EmailVerificationDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
}

export class IdTokenDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5...' })
  @IsNotEmpty()
  idToken: string;
}
