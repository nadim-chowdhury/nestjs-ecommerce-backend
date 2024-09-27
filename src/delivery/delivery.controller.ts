import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryPersonDto } from './dto/create-delivery-person.dto';
import { UpdateDeliveryPersonDto } from './dto/update-delivery-person.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post('person')
  async createDeliveryPerson(
    @Body() createDeliveryPersonDto: CreateDeliveryPersonDto,
  ) {
    return this.deliveryService.createDeliveryPerson(createDeliveryPersonDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('person/:id')
  async updateDeliveryPerson(
    @Param('id') id: number,
    @Body() updateDeliveryPersonDto: UpdateDeliveryPersonDto,
  ) {
    return this.deliveryService.updateDeliveryPerson(
      id,
      updateDeliveryPersonDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('assign-order/:orderId/delivery-person/:deliveryPersonId')
  async assignOrderToDeliveryPerson(
    @Param('orderId') orderId: number,
    @Param('deliveryPersonId') deliveryPersonId: number,
  ) {
    return this.deliveryService.assignOrderToDeliveryPerson(
      orderId,
      deliveryPersonId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('order/:id/status')
  async updateOrderStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ) {
    return this.deliveryService.updateOrderStatus(id, status);
  }
}
