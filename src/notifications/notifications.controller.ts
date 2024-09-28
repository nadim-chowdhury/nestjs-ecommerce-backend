import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { SendPushNotificationDto } from './dto/send-push-notification.dto';
import { SendEmailNotificationDto } from './dto/send-email-notification.dto';

@ApiTags('Notifications') // Group for Swagger UI
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send-otp')
  @ApiOperation({ summary: 'Send OTP via AWS SNS' })
  @ApiBody({ type: SendOtpDto })
  sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.notificationsService.sendOtp(sendOtpDto);
  }

  @Post('send-push')
  @ApiOperation({ summary: 'Send Firebase push notification' })
  @ApiBody({ type: SendPushNotificationDto })
  sendPushNotification(
    @Body() sendPushNotificationDto: SendPushNotificationDto,
  ) {
    return this.notificationsService.sendPushNotification(
      sendPushNotificationDto.token,
      sendPushNotificationDto.title,
      sendPushNotificationDto.body,
    );
  }

  @Post('send-email-notification')
  @ApiOperation({ summary: 'Send general email notification' })
  @ApiBody({ type: SendEmailNotificationDto })
  sendEmailNotification(
    @Body() sendEmailNotificationDto: SendEmailNotificationDto,
  ) {
    return this.notificationsService.sendEmailNotification(
      sendEmailNotificationDto.email,
      sendEmailNotificationDto.subject,
      sendEmailNotificationDto.content,
    );
  }
}
