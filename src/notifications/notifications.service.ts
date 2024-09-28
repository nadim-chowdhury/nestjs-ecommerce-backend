import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationLog } from './entities/notification-log.entity';
import { SendOtpDto } from './dto/send-otp.dto';
import * as admin from 'firebase-admin';
import * as AWS from 'aws-sdk';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private sns: AWS.SNS;
  private transporter: nodemailer.Transporter;

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

    // Initialize Nodemailer transporter (you can replace SMTP settings with your email provider's details)
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // For example, using Gmail
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password', // Use environment variables in production
      },
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

  // Send a general email notification via Nodemailer
  async sendEmailNotification(
    email: string,
    subject: string,
    content: string,
  ): Promise<void> {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: subject,
      text: content, // Can be plain text or HTML
    };

    try {
      await this.transporter.sendMail(mailOptions);

      // Log the email notification
      const log = this.notificationLogRepository.create({
        type: 'email',
        recipient: email,
        message: `Email sent: ${subject}`,
      });
      await this.notificationLogRepository.save(log);

      this.logger.log(`Email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error('Error sending email notification', error);
      throw error;
    }
  }
}
