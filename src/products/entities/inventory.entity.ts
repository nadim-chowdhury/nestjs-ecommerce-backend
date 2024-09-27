import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  stockQuantity: number;

  @Column('jsonb', { nullable: true })
  bulkPricing: Record<string, number>; // Example: { "100": 7500, "500": 35000 }
}
