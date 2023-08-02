import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryDto } from './add-inventory.dto';
import { UpdateInventoryDto } from './update-inventory.dto';

@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    const result = await this.inventoriesService.findAll(page, perPage);
    return {
      pagination: {
        page,
        perPage,
      },
      result,
    };
  }

  @Get(':id')
  async getStore(@Param('id') id: string): Promise<Inventory> {
    const inventory = await this.inventoriesService.findById(id);
    return inventory;
  }

  @Post()
  async create(
    @Body() createInventoryDto: CreateInventoryDto,
  ): Promise<string> {
    await this.inventoriesService.create(createInventoryDto);
    return 'Inventory has been successfully created';
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    const inventory = await this.inventoriesService.update(
      id,
      updateInventoryDto,
    );
    return inventory;
  }
}
