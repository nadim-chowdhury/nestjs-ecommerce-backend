import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Inventory } from './entities/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Inventory])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
