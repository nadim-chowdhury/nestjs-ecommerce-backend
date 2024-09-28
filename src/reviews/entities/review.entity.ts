import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the review' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The rating for the product', example: 4 })
  rating: number;

  @Column()
  @ApiProperty({
    description: 'The review comment',
    example: 'Great product, highly recommend!',
  })
  comment: string;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  @ApiProperty({
    type: () => User,
    description: 'The user who wrote the review',
  })
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'SET NULL',
  })
  @ApiProperty({
    type: () => Product,
    description: 'The product that was reviewed',
  })
  product: Product;
}
