import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationLog } from './entities/notification-log.entity';
import { SendOtpDto } from './dto/send-otp.dto';
import * as admin from 'firebase-admin';
import * as AWS from 'aws-sdk';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private sns: AWS.SNS;

  constructor(
    @InjectRepository(NotificationLog)
    private notificationLogRepository: Repository<NotificationLog>,
  ) {
    // Initialize AWS SNS
    this.sns = new AWS.SNS({
      region: 'your-region',
    });

    // Initialize Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }

  // Send Firebase Push Notification
  async sendPushNotification(
    token: string,
    title: string,
    body: string,
  ): Promise<void> {
    const message = {
      notification: {
        title,
        body,
      },
      token,
    };

    try {
      await admin.messaging().send(message);

      // Log the notification
      const log = this.notificationLogRepository.create({
        type: 'firebase',
        recipient: token,
        message: JSON.stringify(message),
      });
      await this.notificationLogRepository.save(log);
      this.logger.log('Firebase notification sent successfully.');
    } catch (error) {
      this.logger.error('Error sending Firebase notification', error);
      throw error;
    }
  }

  // Send OTP via AWS SNS
  async sendOtp(sendOtpDto: SendOtpDto): Promise<void> {
    const { phoneNumber } = sendOtpDto;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const params = {
      Message: `Your OTP code is ${otp}`,
      PhoneNumber: phoneNumber,
    };

    try {
      await this.sns.publish(params).promise();

      // Log the notification
      const log = this.notificationLogRepository.create({
        type: 'sns',
        recipient: phoneNumber,
        message: `OTP sent: ${otp}`,
      });
      await this.notificationLogRepository.save(log);

      this.logger.log(`OTP sent successfully to ${phoneNumber}`);
    } catch (error) {
      this.logger.error('Error sending OTP via SNS', error);
      throw error;
    }
  }

  // Send Email via Firebase
  async sendEmailVerification(email: string): Promise<void> {
    const actionCodeSettings = {
      url: `https://your-app-url/verify-email?email=${email}`,
      handleCodeInApp: true,
    };

    try {
      await admin
        .auth()
        .generateEmailVerificationLink(email, actionCodeSettings);

      const log = this.notificationLogRepository.create({
        type: 'firebase-email',
        recipient: email,
        message: 'Email verification link sent.',
      });
      await this.notificationLogRepository.save(log);

      this.logger.log(`Email verification link sent to ${email}`);
    } catch (error) {
      this.logger.error('Error sending email verification', error);
      throw error;
    }
  }
}
