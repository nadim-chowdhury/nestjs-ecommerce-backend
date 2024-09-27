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

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  sku: string; // Stock Keeping Unit

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  category: Category;

  @OneToOne(() => Inventory, { cascade: true })
  @JoinColumn()
  inventory: Inventory;
}
