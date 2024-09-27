import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryPersonDto } from './dto/create-delivery-person.dto';
import { UpdateDeliveryPersonDto } from './dto/update-delivery-person.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@ApiTags('Delivery') // Swagger Tag to group delivery-related endpoints
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post('person')
  @ApiOperation({ summary: 'Create a new delivery person' })
  @ApiBody({ type: CreateDeliveryPersonDto })
  async createDeliveryPerson(
    @Body() createDeliveryPersonDto: CreateDeliveryPersonDto,
  ) {
    return this.deliveryService.createDeliveryPerson(createDeliveryPersonDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // Requires JWT token
  @Patch('person/:id')
  @ApiOperation({ summary: 'Update delivery person details' })
  @ApiParam({ name: 'id', description: 'ID of the delivery person' })
  @ApiBody({ type: UpdateDeliveryPersonDto })
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
  @ApiBearerAuth() // Requires JWT token
  @Patch('assign-order/:orderId/delivery-person/:deliveryPersonId')
  @ApiOperation({ summary: 'Assign an order to a delivery person' })
  @ApiParam({ name: 'orderId', description: 'ID of the order' })
  @ApiParam({
    name: 'deliveryPersonId',
    description: 'ID of the delivery person',
  })
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
  @ApiBearerAuth() // Requires JWT token
  @Patch('order/:id/status')
  @ApiOperation({ summary: 'Update the status of an order' })
  @ApiParam({ name: 'id', description: 'ID of the order' })
  @ApiBody({ schema: { example: { status: 'delivered' } } }) // Example request body
  async updateOrderStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ) {
    return this.deliveryService.updateOrderStatus(id, status);
  }
}
