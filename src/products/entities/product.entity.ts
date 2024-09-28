import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Seller } from 'src/sellers/entities/seller.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Inventory } from './inventory.entity';
import { Category } from './category.entity';

@Entity('products')
export class Product {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the product',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Laptop', description: 'The name of the product' })
  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  @ApiProperty({
    type: () => Category,
    description: 'The category the product belongs to',
  })
  category: Category; // Category entity, not a string

  @ApiProperty({
    example: 'High-performance laptop',
    description: 'Product description',
  })
  @Column()
  description: string;

  @ApiProperty({ example: 100, description: 'Quantity in stock' })
  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({ example: 999.99, description: 'The price of the product' })
  price: number; // Add the price column here

  @ApiProperty({ example: 'Dell', description: 'Brand of the product' })
  @Column()
  brand: string;

  @ApiProperty({ example: 'New', description: 'Condition of the product' })
  @Column()
  condition: string;

  @ApiProperty({ example: '1.5kg', description: 'Weight of the product' })
  @Column()
  weight: string;

  @ApiProperty({
    example: 'front.jpg',
    description: 'Front photo of the product',
    nullable: true,
  })
  @Column({ nullable: true })
  frontPhoto: string;

  @ApiProperty({
    example: 'right.jpg',
    description: 'Right side photo of the product',
    nullable: true,
  })
  @Column({ nullable: true })
  rightPhoto: string;

  @ApiProperty({
    example: 'back.jpg',
    description: 'Back photo of the product',
    nullable: true,
  })
  @Column({ nullable: true })
  backPhoto: string;

  @ApiProperty({
    type: () => Seller,
    description: 'The seller associated with the product',
  })
  @ManyToOne(() => Seller, (seller) => seller.products, { onDelete: 'CASCADE' })
  seller: Seller;

  // Add OneToMany relationship for reviews
  @ApiProperty({
    type: () => [Review],
    description: 'List of reviews associated with the product',
  })
  @OneToMany(() => Review, (review) => review.product, { cascade: true })
  reviews: Review[];

  // Add OneToOne relationship for inventory
  @ApiProperty({
    type: () => Inventory,
    description: 'The inventory details of the product',
  })
  @OneToOne(() => Inventory, { cascade: true })
  @JoinColumn() // Specify that this will be the owning side of the relationship
  inventory: Inventory;

  @ApiProperty({
    example: '2024-09-27T12:34:56.789Z',
    description: 'The date when the product was created',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2024-09-27T12:34:56.789Z',
    description: 'The date when the product was last updated',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
