import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the category',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Electronics',
    description: 'The name of the category',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: () => [Product],
    description: 'List of products associated with this category',
  })
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
