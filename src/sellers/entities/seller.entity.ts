import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('sellers')
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  mobileNumber: string;

  @Column({ nullable: true })
  gstin: string;

  @Column({ nullable: true })
  udyamRegistrationNumber: string;

  @Column({ nullable: true })
  shopFrontPhoto: string;

  @Column({ nullable: true })
  shopRightPhoto: string;

  @Column({ nullable: true })
  shopStreetPhoto: string;

  @Column({ default: false })
  isApproved: boolean; // Status set by admin after authorization

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];
}
