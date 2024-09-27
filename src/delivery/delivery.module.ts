import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryPerson } from './entities/delivery-person.entity';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryPerson, Order])],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
