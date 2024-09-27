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

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User; // This tracks the user who placed the order

  @Column('decimal', { precision: 10, scale: 2 })
  total: number; // Total price of the order

  @Column({
    type: 'enum',
    enum: ['placed', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'placed',
  })
  status: string; // The current status of the order

  @Column()
  deliveryAddress: string; // The address where the order will be delivered

  @Column()
  orderDetails: string; // Can be a JSON or detailed order description

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[]; // The list of items in the order

  @ManyToOne(() => DeliveryPerson, (deliveryPerson) => deliveryPerson.orders, {
    nullable: true,
  })
  deliveryPerson: DeliveryPerson; // The delivery person assigned to this order, if any
}
