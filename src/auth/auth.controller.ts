import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Post('send-otp')
  async sendOtp(@Body() body: { mobileNumber: string }) {
    return this.authService.sendOtp(body.mobileNumber);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { mobileNumber: string; otp: string }) {
    return this.authService.verifyOtp(body.mobileNumber, body.otp);
  }

  @Post('send-email-verification')
  async sendEmailVerification(@Body() body: { email: string }) {
    return this.authService.sendEmailVerification(body.email);
  }

  @Post('verify-email-token')
  async verifyEmailToken(@Body() body: { idToken: string }) {
    return this.authService.verifyEmailToken(body.idToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
