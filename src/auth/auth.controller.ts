import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import {
  LoginDto,
  OtpDto,
  EmailVerificationDto,
  IdTokenDto,
} from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login with email and password' })
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.authService.login(user);
  }

  @Post('send-otp')
  @ApiOperation({ summary: 'Send OTP to the provided mobile number' })
  @ApiBody({ type: OtpDto })
  async sendOtp(@Body() body: OtpDto) {
    return this.authService.sendOtp(body.mobileNumber);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify the OTP sent to the mobile number' })
  @ApiBody({ type: OtpDto })
  async verifyOtp(@Body() body: OtpDto) {
    return this.authService.verifyOtp(body.mobileNumber, body.otp);
  }

  @Post('send-email-verification')
  @ApiOperation({ summary: 'Send email verification link' })
  @ApiBody({ type: EmailVerificationDto })
  async sendEmailVerification(@Body() body: EmailVerificationDto) {
    return this.authService.sendEmailVerification(body.email);
  }

  @Post('verify-email-token')
  @ApiOperation({ summary: 'Verify the email verification token' })
  @ApiBody({ type: IdTokenDto })
  async verifyEmailToken(@Body() body: IdTokenDto) {
    return this.authService.verifyEmailToken(body.idToken);
  }
}
