import { Order } from 'src/orders/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('delivery_persons')
export class DeliveryPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  mobileNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  vehicleDetails: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  idProof: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.deliveryPerson)
  orders: Order[];
}
