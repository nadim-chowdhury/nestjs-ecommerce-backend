import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ReportLog } from './entities/report-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportLog])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
