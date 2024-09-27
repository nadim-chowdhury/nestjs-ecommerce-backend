import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Invoice } from './entities/invoice.entity';
import { Product } from '../products/entities/product.entity';
import { UsersModule } from '../users/users.module'; // Import UsersModule to access UserRepository

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Invoice, Product]),
    UsersModule, // Import the UsersModule to access UserRepository
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
