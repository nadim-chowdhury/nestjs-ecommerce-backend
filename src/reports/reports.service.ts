import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportLog } from './entities/report-log.entity';
import { Workbook } from 'exceljs';
import { Response } from 'express';
import { ReportQueryDto } from './dto/report-query.dto';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    @InjectRepository(ReportLog)
    private reportLogRepository: Repository<ReportLog>,
  ) {}

  async generateSalesReport(query: ReportQueryDto): Promise<any> {
    const { startDate, endDate } = query;
    // Placeholder: Query your order database to get sales data within the date range
    const salesData = [
      { orderId: 1, amount: 1000, date: new Date() },
      { orderId: 2, amount: 2000, date: new Date() },
    ];

    this.logger.log('Sales report generated');
    return salesData;
  }

  async generatePaymentsReport(query: ReportQueryDto): Promise<any> {
    const { startDate, endDate } = query;
    // Placeholder: Query your payment database to get payment data within the date range
    const paymentsData = [
      { paymentId: 1, amount: 500, date: new Date() },
      { paymentId: 2, amount: 1500, date: new Date() },
    ];

    this.logger.log('Payments report generated');
    return paymentsData;
  }

  async exportToExcel(
    data: any[],
    reportType: string,
    res: Response,
  ): Promise<void> {
    if (!data || data.length === 0) {
      res.status(400).send('No data available for the report');
      return;
    }

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(reportType);

    // Add Header Row
    worksheet.addRow(Object.keys(data[0]));

    // Add Data Rows
    data.forEach((row) => {
      worksheet.addRow(Object.values(row));
    });

    // Set headers to return Excel file
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${reportType}.xlsx`,
    );

    await workbook.xlsx.write(res);
    res.send(); // Use send to complete the response
  }

  async logReportGeneration(type: string, generatedBy: string): Promise<void> {
    const log = this.reportLogRepository.create({ type, generatedBy });
    await this.reportLogRepository.save(log);
  }
}
