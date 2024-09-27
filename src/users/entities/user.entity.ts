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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  mobileNumber: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  isMobileVerified: boolean;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  otp: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses: Address[];

  // Add the OneToMany relationship for orders
  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  orders: Order[]; // Each user can have multiple orders
}
