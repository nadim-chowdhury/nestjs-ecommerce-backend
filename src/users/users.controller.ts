import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Address } from './entities/address.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@ApiTags('Users') // Swagger Tag
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get the current user profile' })
  @ApiBearerAuth() // Swagger JWT authentication
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.usersService.findOneById(req.user.id);
  }

  @ApiOperation({ summary: 'Update the current user profile' })
  @ApiBearerAuth() // Swagger JWT authentication
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @ApiOperation({ summary: 'Add a new address to the current user profile' })
  @ApiBearerAuth() // Swagger JWT authentication
  @UseGuards(JwtAuthGuard)
  @Post('addresses')
  async addAddress(@Request() req, @Body() addressData: Partial<Address>) {
    return this.usersService.addAddress(req.user.id, addressData);
  }
}
