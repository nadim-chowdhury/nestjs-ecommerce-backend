import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsModule } from 'src/products/products.module'; // Import ProductsModule for Category

@Module({
  imports: [
    TypeOrmModule.forFeature([Seller, Product]), // Register Seller and Product entities
    ProductsModule, // Import ProductsModule to access Category
  ],
  controllers: [SellersController],
  providers: [SellersService],
})
export class SellersModule {}
