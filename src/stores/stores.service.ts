import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './add-store.dto';
import { UpdateStoreDto } from './update-store.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
  ) {}

  async findAll(page: number, perPage: number): Promise<Store[]> {
    const skip = (page - 1) * perPage;
    const take = perPage;
    return await this.storesRepository.find({ skip, take });
  }

  async create(createStoreDto: CreateStoreDto): Promise<void> {
    const store = new Store();
    store.store_address = createStoreDto.store_address;
    store.store_manager_name = createStoreDto.store_manager_name;
    await this.storesRepository.save(store);
  }

  async findById(id: string): Promise<Store> {
    return await this.storesRepository.findOne({ where: { id: Number(id) } });
  }

  async update(id: string, updateStoreDto: UpdateStoreDto): Promise<Store> {
    const store = await this.storesRepository.findOne({
      where: { id: Number(id) },
    });
    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }
    Object.assign(store, updateStoreDto);
    await this.storesRepository.save(store);
    return store;
  }
}
