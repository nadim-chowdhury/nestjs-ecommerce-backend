import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Address } from './entities/address.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@ApiTags('Users') // Swagger Tag for User APIs
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get the current user profile (JWT protected)
  @ApiOperation({ summary: 'Get the current user profile' })
  @ApiBearerAuth() // JWT authentication in Swagger
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.usersService.findOneById(req.user.id);
  }

  // Update the current user profile (JWT protected)
  @ApiOperation({ summary: 'Update the current user profile' })
  @ApiBearerAuth() // JWT authentication in Swagger
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  // Add a new address to the current user profile (JWT protected)
  @ApiOperation({ summary: 'Add a new address to the current user profile' })
  @ApiBearerAuth() // JWT authentication in Swagger
  @UseGuards(JwtAuthGuard)
  @Post('addresses')
  async addAddress(@Request() req, @Body() addressData: Partial<Address>) {
    return this.usersService.addAddress(req.user.id, addressData);
  }
}
