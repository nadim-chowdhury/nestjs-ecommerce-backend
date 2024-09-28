import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // Import the ApiProperty decorator
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'The unique identifier of the wishlist item',
    example: 1,
  })
  id: number;

  @ManyToOne(() => User, (user) => user.wishlists, { onDelete: 'CASCADE' })
  @ApiProperty({
    type: () => User,
    description: 'The user who added the product to the wishlist',
  })
  user: User;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'SET NULL' })
  @ApiProperty({
    type: () => Product,
    description: 'The product added to the wishlist',
  })
  product: Product;
}
