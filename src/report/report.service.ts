import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async generateMonthlyReport(): Promise<any> {
    const queryBuilder = this.ordersRepository
      .createQueryBuilder('order')
      .select('order.store_id as store_id')
      .addSelect('order.status as status')
      .addSelect('COUNT(*) as count')
      .groupBy('store_id, status')
      .orderBy('store_id, status');

    const result = await queryBuilder.getRawMany();

    return result;
  }
}
