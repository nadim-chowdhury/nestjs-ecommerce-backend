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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  brand: string;

  @Column()
  condition: string;

  @Column()
  weight: string;

  @Column({ nullable: true })
  frontPhoto: string;

  @Column({ nullable: true })
  rightPhoto: string;

  @Column({ nullable: true })
  backPhoto: string;

  @ManyToOne(() => Seller, (seller) => seller.products, { onDelete: 'CASCADE' })
  seller: Seller;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
