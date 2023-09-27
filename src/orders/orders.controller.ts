import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './add-order.dto';
import { UpdateOrderDto } from './update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    const result = await this.ordersService.findAll(page, perPage);

    return {
      pagination: {
        page,
        perPage,
      },
      result,
    };
  }

  @Get(':id')
  async getStore(@Param('id') id: string): Promise<Order> {
    const order = await this.ordersService.findById(id);
    return order;
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<string> {
    await this.ordersService.create(createOrderDto);
    return 'Order has been successfully created';
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.ordersService.update(id, updateOrderDto);
    return order;
  }
}
