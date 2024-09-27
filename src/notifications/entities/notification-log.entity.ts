import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('notification_logs')
export class NotificationLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // 'firebase', 'sns', etc.

  @Column()
  recipient: string; // email or phone number

  @Column('text')
  message: string;

  @CreateDateColumn()
  sentAt: Date;
}
