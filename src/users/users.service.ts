import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { Otp } from 'src/auth/entities/otp.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Otp) private otpRepository: Repository<Otp>, // Otp repository
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {}

  // Save OTP to the database with expiration (5 minutes)
  async saveOtpForUser(
    mobileNumber: string,
    otp: string,
    expiresIn: number,
  ): Promise<void> {
    const expiresAt = new Date(Date.now() + expiresIn * 1000); // Set expiration time

    // Check if there's an existing OTP for the same mobile number and remove it to avoid duplication
    await this.otpRepository.delete({ mobileNumber });

    // Create and save the new OTP record
    const otpRecord = this.otpRepository.create({
      mobileNumber,
      otp,
      expiresAt,
    });

    try {
      await this.otpRepository.save(otpRecord);
    } catch (error) {
      throw new Error('Failed to save OTP. Please try again later.');
    }
  }

  // Retrieve OTP and check expiration
  async getOtpForUser(mobileNumber: string): Promise<string | null> {
    const otpRecord = await this.otpRepository.findOne({
      where: { mobileNumber },
      order: { createdAt: 'DESC' }, // Get the latest OTP
    });

    if (!otpRecord) {
      return null; // No OTP found
    }

    // Check if OTP is expired
    if (otpRecord.expiresAt < new Date()) {
      // If expired, delete the OTP record
      await this.otpRepository.delete(otpRecord.id);
      return null; // OTP has expired
    }

    // Return the valid OTP
    return otpRecord.otp;
  }

  // Find user by ID (with addresses relation)
  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['addresses'], // Eager load related addresses
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Update user profile (allow password change with bcrypt hashing)
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);

    // If a new password is provided, hash it before updating
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Update user fields
    await this.usersRepository.update(id, updateUserDto);

    // Return the updated user
    return this.findOneById(id);
  }

  // Add an address to the user's profile
  async addAddress(
    userId: number,
    addressData: Partial<Address>,
  ): Promise<Address> {
    const user = await this.findOneById(userId); // Fetch the user first

    // Create and save a new address
    const address = this.addressRepository.create({ ...addressData, user });
    return this.addressRepository.save(address);
  }

  // Find or create a user by mobile number (for OTP-based login)
  async findOrCreateByMobile(mobileNumber: string): Promise<User> {
    let user = await this.usersRepository.findOne({
      where: { mobileNumber },
    });

    if (!user) {
      // If the user doesn't exist, create a new user
      const newUser = this.usersRepository.create({
        mobileNumber,
        password: '', // Since this is OTP-based login, no password is needed
      });
      user = await this.usersRepository.save(newUser);
    }

    return user;
  }

  // Find user by email
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['addresses'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
