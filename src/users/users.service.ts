import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  // Find user by mobile number
  async findOneByMobile(mobileNumber: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { mobileNumber },
      relations: ['addresses'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Find or create a user by mobile number
  async findOrCreateByMobile(mobileNumber: string): Promise<User> {
    let user = await this.findOneByMobile(mobileNumber);

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

  // Update user
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOneById(id);
  }

  // Find user by ID
  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Add address to user
  async addAddress(
    userId: number,
    addressData: Partial<Address>,
  ): Promise<Address> {
    const user = await this.findOneById(userId);
    const address = this.addressRepository.create({ ...addressData, user });
    return this.addressRepository.save(address);
  }

  // Get order history (requires Order entity to be implemented)
  async getOrderHistory(userId: number) {
    // Logic to fetch orders related to this user
    // You would join the user with the orders table and fetch relevant data.
    throw new Error('Method not implemented.');
  }
}
