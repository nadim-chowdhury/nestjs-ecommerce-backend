import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Seller } from './seller.entity';

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

  @ApiProperty({
    example: 'Electronics',
    description: 'The category of the product',
  })
  @Column()
  category: string;

  @ApiProperty({
    example: 'High-performance laptop',
    description: 'Product description',
  })
  @Column()
  description: string;

  @ApiProperty({ example: 100, description: 'Quantity in stock' })
  @Column()
  quantity: number;

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
