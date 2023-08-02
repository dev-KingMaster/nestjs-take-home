import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './add-order.dto';
import { UpdateOrderDto } from './update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async findAll(page: number, perPage: number): Promise<Order[]> {
    const skip = (page - 1) * perPage;
    const take = perPage;
    return await this.ordersRepository.find({ skip, take });
  }

  async create(createOrderDto: CreateOrderDto): Promise<void> {
    const order = new Order();
    order.customer_id = createOrderDto.customer_id;
    order.inventory_id = createOrderDto.inventory_id;
    order.create_date = createOrderDto.create_date;
    order.quantity = createOrderDto.quantity;
    order.status = createOrderDto.status;
    order.store_id = createOrderDto.store_id;
    order.update_date = createOrderDto.update_date;
    await this.ordersRepository.save(order);
  }

  async findById(id: string): Promise<Order> {
    return await this.ordersRepository.findOne({ where: { id: Number(id) } });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id: Number(id) },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    Object.assign(order, updateOrderDto);
    await this.ordersRepository.save(order);
    return order;
  }
}
