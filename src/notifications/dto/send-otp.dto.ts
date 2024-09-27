import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDto {
  @ApiProperty({
    description: 'The phone number to which the OTP will be sent',
    example: '+1234567890',
  })
  @IsNotEmpty()
  @IsPhoneNumber(null)
  phoneNumber: string;
}
