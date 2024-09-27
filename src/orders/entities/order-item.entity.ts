import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('order_items')
export class OrderItem {
  @ApiProperty({
    description: 'Unique identifier for the order item',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The order this item belongs to' })
  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order;

  @ApiProperty({ description: 'The product associated with this item' })
  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'SET NULL' })
  product: Product;

  @ApiProperty({
    description: 'Quantity of the product in the order',
    example: 2,
  })
  @Column('int')
  quantity: number;

  @ApiProperty({ description: 'Total price for this item', example: 49.99 })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}
