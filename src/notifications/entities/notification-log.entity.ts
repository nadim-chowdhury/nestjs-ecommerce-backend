import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('notification_logs')
export class NotificationLog {
  @ApiProperty({
    description: 'The unique identifier for the notification log',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The type of notification sent (e.g., "firebase", "sns")',
    example: 'sns',
  })
  @Column()
  type: string; // 'firebase', 'sns', etc.

  @ApiProperty({
    description: 'The recipient of the notification (phone number or email)',
    example: '+1234567890',
  })
  @Column()
  recipient: string; // email or phone number

  @ApiProperty({
    description: 'The message content that was sent',
    example: 'Your OTP is 123456',
  })
  @Column('text')
  message: string;

  @ApiProperty({
    description: 'The timestamp when the notification was sent',
    example: '2024-09-28T12:34:56.789Z',
  })
  @CreateDateColumn()
  sentAt: Date;
}
