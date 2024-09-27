import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('inventory')
export class Inventory {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the inventory',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 100, description: 'The quantity of stock available' })
  @Column('int')
  stockQuantity: number;

  @ApiProperty({
    example: { '100': 7500, '500': 35000 },
    description:
      'Bulk pricing information in a key-value pair format. E.g., { "quantity": price }',
  })
  @Column('jsonb', { nullable: true })
  bulkPricing: Record<string, number>;
}
