import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('monthly')
  async getMonthlyReport(): Promise<any> {
    return this.reportService.generateMonthlyReport();
  }
}
