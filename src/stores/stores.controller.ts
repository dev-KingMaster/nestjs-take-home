import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './add-store.dto';
import { Store } from './entities/store.entity';
import { UpdateStoreDto } from './update-store.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    const result = await this.storesService.findAll(page, perPage);
    return {
      pagination: {
        page,
        perPage,
      },
      result,
    };
  }

  @Get(':id')
  async getStore(@Param('id') id: string): Promise<Store> {
    const store = await this.storesService.findById(id);
    return store;
  }

  @Post()
  async create(@Body() createStoreDto: CreateStoreDto): Promise<string> {
    await this.storesService.create(createStoreDto);
    return 'Store has been successfully created';
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ): Promise<Store> {
    const store = await this.storesService.update(id, updateStoreDto);
    return store;
  }
}
