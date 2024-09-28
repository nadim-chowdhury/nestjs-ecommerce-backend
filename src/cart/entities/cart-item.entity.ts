import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the cart item' })
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @ApiProperty({
    type: () => Cart,
    description: 'The cart this item belongs to',
  })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'SET NULL' })
  @ApiProperty({ type: () => Product, description: 'The product in the cart' })
  product: Product;

  @Column('int')
  @ApiProperty({ description: 'The quantity of the product' })
  quantity: number;
}
