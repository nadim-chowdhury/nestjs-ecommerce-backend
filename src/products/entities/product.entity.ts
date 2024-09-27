import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Inventory } from './inventory.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the product',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'iPhone 12', description: 'The name of the product' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'A high-quality smartphone',
    description: 'A detailed description of the product',
  })
  @Column('text')
  description: string;

  @ApiProperty({ example: 999.99, description: 'The price of the product' })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    example: 'IPH12-BLK-64GB',
    description: 'The SKU (Stock Keeping Unit) of the product',
  })
  @Column()
  sku: string;

  @ApiProperty({
    type: () => Category,
    description: 'The category to which this product belongs',
  })
  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  category: Category;

  @ApiProperty({
    type: () => Inventory,
    description:
      'The inventory details, such as stock quantity and bulk pricing',
  })
  @OneToOne(() => Inventory, { cascade: true })
  @JoinColumn()
  inventory: Inventory;
}
