import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendOtpDto } from './dto/send-otp.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Endpoint to send OTP via AWS SNS
  @Post('send-otp')
  sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.notificationsService.sendOtp(sendOtpDto);
  }

  // Endpoint to trigger Firebase push notification
  @Post('send-push')
  sendPushNotification(
    @Body('token') token: string,
    @Body('title') title: string,
    @Body('body') body: string,
  ) {
    return this.notificationsService.sendPushNotification(token, title, body);
  }

  // Endpoint to send email verification
  @Post('send-email-verification')
  sendEmailVerification(@Body('email') email: string) {
    return this.notificationsService.sendEmailVerification(email);
  }
}
