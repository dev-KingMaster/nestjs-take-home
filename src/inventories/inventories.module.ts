import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoriesController } from './inventories.controller';
import { InventoriesService } from './inventories.service';
import { Inventory } from './entities/inventory.entity';

@Module({
  controllers: [InventoriesController],
  providers: [InventoriesService],
  imports: [TypeOrmModule.forFeature([Inventory])],
  exports: [TypeOrmModule],
})
export class InventoriesModule {}
