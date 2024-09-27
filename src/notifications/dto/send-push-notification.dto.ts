import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendPushNotificationDto {
  @ApiProperty({ example: 'user_device_token' })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ example: 'Order Update' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Your order has been shipped.' })
  @IsNotEmpty()
  @IsString()
  body: string;
}
