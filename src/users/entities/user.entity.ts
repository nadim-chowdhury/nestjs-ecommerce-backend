import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Address } from './address.entity';
import { Order } from '../../orders/entities/order.entity'; // Import the Order entity

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
    uniqueItems: true,
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: '9876543210',
    description: 'The mobile number of the user',
    uniqueItems: true,
  })
  @Column({ unique: true })
  mobileNumber: string;

  @ApiProperty({
    example: 'hashedpassword',
    description: 'The hashed password of the user',
    nullable: true,
  })
  @Column({ nullable: true })
  password: string;

  @ApiProperty({
    example: false,
    description: 'Whether the user has verified their mobile number',
  })
  @Column({ default: false })
  isMobileVerified: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether the user has verified their email',
  })
  @Column({ default: false })
  isEmailVerified: boolean;

  @ApiProperty({
    example: '123456',
    description: 'The OTP used for verification',
    nullable: true,
  })
  @Column({ nullable: true })
  otp: string;

  @ApiProperty({
    example: '2024-09-27T12:34:56.789Z',
    description: 'The date when the user was created',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2024-09-27T12:34:56.789Z',
    description: 'The date when the user was last updated',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    type: () => [Address],
    description: 'The list of addresses associated with the user',
  })
  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses: Address[];

  @ApiProperty({
    type: () => [Order],
    description: 'The list of orders associated with the user',
  })
  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  orders: Order[]; // Each user can have multiple orders
}
