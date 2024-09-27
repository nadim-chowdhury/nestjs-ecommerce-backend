import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('report_logs')
export class ReportLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // 'sales', 'payments', etc.

  @Column()
  generatedBy: string; // admin or user email/ID

  @CreateDateColumn()
  generatedAt: Date;
}
