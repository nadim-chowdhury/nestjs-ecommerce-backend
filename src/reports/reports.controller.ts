import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { ReportQueryDto } from './dto/report-query.dto';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';

@Controller('reports')
@UseGuards(RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('sales')
  @Roles(Role.Admin)
  async getSalesReport(@Query() query: ReportQueryDto) {
    return this.reportsService.generateSalesReport(query);
  }

  @Get('payments')
  @Roles(Role.Admin)
  async getPaymentsReport(@Query() query: ReportQueryDto) {
    return this.reportsService.generatePaymentsReport(query);
  }

  @Get('sales/export')
  @Roles(Role.Admin)
  async exportSalesReport(
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ) {
    const salesData = await this.reportsService.generateSalesReport(query);
    await this.reportsService.exportToExcel(salesData, 'sales-report', res);
  }

  @Get('payments/export')
  @Roles(Role.Admin)
  async exportPaymentsReport(
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ) {
    const paymentsData =
      await this.reportsService.generatePaymentsReport(query);
    await this.reportsService.exportToExcel(
      paymentsData,
      'payments-report',
      res,
    );
  }
}
