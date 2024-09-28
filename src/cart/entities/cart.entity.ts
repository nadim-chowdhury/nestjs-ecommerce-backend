import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { CartItem } from './cart-item.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the cart' })
  id: number;

  @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => User, description: 'The user who owns the cart' })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  @ApiProperty({
    type: () => [CartItem],
    description: 'List of items in the cart',
  })
  items: CartItem[];
}
