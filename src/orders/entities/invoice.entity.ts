import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('invoices')
export class Invoice {
  @ApiProperty({ description: 'Unique identifier for the invoice', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The order associated with this invoice' })
  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  order: Order;

  @ApiProperty({ description: 'Total amount for the invoice', example: 199.99 })
  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @ApiProperty({
    description: 'File path to the generated invoice',
    example: '/invoices/order-123.pdf',
  })
  @Column()
  invoiceFilePath: string;

  @ApiProperty({ description: 'Date when the invoice was issued' })
  @CreateDateColumn()
  issuedAt: Date;
}
