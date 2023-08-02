import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryDto } from './add-inventory.dto';
import { UpdateInventoryDto } from './update-inventory.dto';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoriesRepository: Repository<Inventory>,
  ) {}

  async findAll(page: number, perPage: number): Promise<Inventory[]> {
    const skip = (page - 1) * perPage;
    const take = perPage;
    return await this.inventoriesRepository.find({ skip, take });
  }

  async create(createInventoryDto: CreateInventoryDto): Promise<void> {
    const inventory = new Inventory();
    inventory.available_quantity = createInventoryDto.available_quantity;
    inventory.inventory_name = createInventoryDto.inventory_name;
    inventory.manufacture_date = createInventoryDto.manufacture_date;
    await this.inventoriesRepository.save(inventory);
  }

  async findById(id: string): Promise<Inventory> {
    return await this.inventoriesRepository.findOne({
      where: { id: Number(id) },
    });
  }

  async update(
    id: string,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    const inventory = await this.inventoriesRepository.findOne({
      where: { id: Number(id) },
    });
    if (!inventory) {
      throw new NotFoundException(`Inventory with id ${id} not found`);
    }
    Object.assign(inventory, updateInventoryDto);
    await this.inventoriesRepository.save(inventory);
    return inventory;
  }
}
