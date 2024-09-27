import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  order: Order;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column()
  invoiceFilePath: string; // Path to the generated invoice file

  @CreateDateColumn()
  issuedAt: Date;
}
