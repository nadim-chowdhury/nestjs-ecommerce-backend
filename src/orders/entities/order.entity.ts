import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeliveryPerson } from 'src/delivery/entities/delivery-person.entity';
import { OrderItem } from './order-item.entity';
import { User } from 'src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order {
  @ApiProperty({ description: 'Unique identifier for the order', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The user who placed the order' })
  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @ApiProperty({ description: 'Total price of the order', example: 199.99 })
  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @ApiProperty({
    description: 'The current status of the order',
    example: 'placed',
    enum: ['placed', 'shipped', 'delivered', 'cancelled', 'returned'],
  })
  @Column({
    type: 'enum',
    enum: ['placed', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'placed',
  })
  status: string;

  @ApiProperty({
    description: 'The delivery address for the order',
    example: '123 Main St, Cityville',
  })
  @Column()
  deliveryAddress: string;

  @ApiProperty({
    description: 'Detailed description of the order or a JSON object',
    example: '{"items": [...]}',
  })
  @Column()
  orderDetails: string;

  @ApiProperty({ description: 'The date when the order was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The date when the order was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'List of items in the order' })
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  @ApiProperty({
    description: 'The delivery person assigned to this order',
    required: false,
  })
  @ManyToOne(() => DeliveryPerson, (deliveryPerson) => deliveryPerson.orders, {
    nullable: true,
  })
  deliveryPerson: DeliveryPerson;
}
