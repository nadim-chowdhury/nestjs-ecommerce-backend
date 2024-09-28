import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sellers')
export class Seller {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the seller',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'The name of the seller' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email address of the seller',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: '+919876543210',
    description: 'Mobile number of the seller',
  })
  @Column({ unique: true })
  mobileNumber: string;

  @ApiProperty({
    example: '27ABCDE1234F2Z5',
    description: 'GSTIN of the seller',
    nullable: true,
  })
  @Column({ nullable: true })
  gstin: string;

  @ApiProperty({
    example: 'Udyam123456',
    description: 'Udyam registration number of the seller',
    nullable: true,
  })
  @Column({ nullable: true })
  udyamRegistrationNumber: string;

  @ApiProperty({
    example: 'shop-front.jpg',
    description: 'Front photo of the seller’s shop',
    nullable: true,
  })
  @Column({ nullable: true })
  shopFrontPhoto: string;

  @ApiProperty({
    example: 'shop-right.jpg',
    description: 'Right side photo of the seller’s shop',
    nullable: true,
  })
  @Column({ nullable: true })
  shopRightPhoto: string;

  @ApiProperty({
    example: 'shop-street.jpg',
    description: 'Street photo of the seller’s shop',
    nullable: true,
  })
  @Column({ nullable: true })
  shopStreetPhoto: string;

  @ApiProperty({
    example: false,
    description: 'Indicates if the seller is approved by the admin',
  })
  @Column({ default: false })
  isApproved: boolean;

  @ApiProperty({
    example: '2024-09-27T12:34:56.789Z',
    description: 'The date when the seller was created',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2024-09-27T12:34:56.789Z',
    description: 'The date when the seller was last updated',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    type: () => [Product],
    description: 'List of products offered by the seller',
  })
  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];
}
