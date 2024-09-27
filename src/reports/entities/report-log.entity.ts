import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('report_logs')
export class ReportLog {
  @ApiProperty({ example: 1, description: 'Unique ID of the report log entry' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'sales',
    description: 'Type of the report (sales, payments, etc.)',
  })
  @Column()
  type: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Email or ID of the user who generated the report',
  })
  @Column()
  generatedBy: string;

  @ApiProperty({
    example: '2023-09-28T12:34:56.000Z',
    description: 'The date and time when the report was generated',
  })
  @CreateDateColumn()
  generatedAt: Date;
}
