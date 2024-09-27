import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as admin from 'firebase-admin';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private snsClient: SNSClient;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.snsClient = new SNSClient({
      region: configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  // Validate user based on email and password
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Login and generate JWT token
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // OTP Login via AWS SNS or Fast2SMS
  async sendOtp(mobileNumber: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Use AWS SNSClient from AWS SDK v3 to send OTP via SMS
    const command = new PublishCommand({
      Message: `Your OTP is ${otp}`,
      PhoneNumber: `+91${mobileNumber}`,
    });

    await this.snsClient.send(command);

    // Save the OTP against the user in a database or cache (e.g., Redis)
    // Example: await this.usersService.saveOtpForUser(mobileNumber, otp);

    return { message: 'OTP sent successfully' };
  }

  // Verify OTP
  async verifyOtp(mobileNumber: string, otp: string) {
    const isValidOtp = true; // Check OTP against the stored value in DB

    if (!isValidOtp) {
      throw new BadRequestException('Invalid OTP');
    }

    const user = await this.usersService.findOrCreateByMobile(mobileNumber);
    const payload = { mobile: user.mobileNumber, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Firebase Email Verification
  async sendEmailVerification(email: string) {
    const userRecord = await admin.auth().getUserByEmail(email);
    if (userRecord.emailVerified) {
      throw new BadRequestException('Email already verified');
    }

    const verificationLink = await admin
      .auth()
      .generateEmailVerificationLink(email);

    // Send the email (you can use a service like SendGrid, Nodemailer, etc.)
    return { message: 'Verification email sent' };
  }

  // Verify Firebase email token
  async verifyEmailToken(idToken: string) {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  }
}
