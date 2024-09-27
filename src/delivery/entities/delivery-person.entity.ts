import { Order } from 'src/orders/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('delivery_persons')
export class DeliveryPerson {
  @ApiProperty({
    description: 'The unique identifier for the delivery person',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The full name of the delivery person',
    example: 'John Doe',
  })
  @Column()
  fullName: string;

  @ApiProperty({
    description: 'The mobile number of the delivery person',
    example: '+919876543210',
  })
  @Column({ unique: true })
  mobileNumber: string;

  @ApiProperty({
    description: 'The email of the delivery person (optional)',
    example: 'john.doe@example.com',
  })
  @Column({ nullable: true })
  email: string;

  @ApiProperty({
    description: 'Vehicle details of the delivery person (optional)',
    example: 'Honda Activa, Red, DL-01-AB-1234',
  })
  @Column({ nullable: true })
  vehicleDetails: string;

  @ApiProperty({
    description: 'Profile picture of the delivery person (optional)',
    example: 'profile-pic-url.jpg',
  })
  @Column({ nullable: true })
  profilePicture: string;

  @ApiProperty({
    description: 'ID proof of the delivery person (optional)',
    example: 'ID-proof-url.pdf',
  })
  @Column({ nullable: true })
  idProof: string;

  @ApiProperty({
    description: 'Whether the delivery person is active',
    example: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'The date the delivery person was created',
    example: '2024-09-28T12:34:56.789Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The date the delivery person was last updated',
    example: '2024-09-28T12:34:56.789Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'List of orders assigned to the delivery person',
    type: () => [Order],
  })
  @OneToMany(() => Order, (order) => order.deliveryPerson)
  orders: Order[];
}
