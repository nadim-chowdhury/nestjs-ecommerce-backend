import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('addresses')
export class Address {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the address',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '123 Main St', description: 'Street address' })
  @Column()
  street: string;

  @ApiProperty({ example: 'New York', description: 'City of the address' })
  @Column()
  city: string;

  @ApiProperty({ example: 'NY', description: 'State of the address' })
  @Column()
  state: string;

  @ApiProperty({ example: 'USA', description: 'Country of the address' })
  @Column()
  country: string;

  @ApiProperty({ example: '10001', description: 'Postal code of the address' })
  @Column()
  postalCode: string;

  @ApiProperty({
    type: () => User,
    description: 'The user associated with the address',
  })
  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  user: User;

  @ApiProperty({
    example: '2024-09-27T12:34:56.789Z',
    description: 'The date when the address was created',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2024-09-27T12:34:56.789Z',
    description: 'The date when the address was last updated',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
