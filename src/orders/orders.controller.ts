import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto, req.user.id);
  }

  @Get()
  findOrdersByUser(@Request() req) {
    return this.ordersService.findOrdersByUser(req.user.id);
  }

  @Get(':id')
  findOrderById(@Param('id') id: number) {
    return this.ordersService.findOrderById(id);
  }

  @Patch(':id')
  updateOrder(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @Post(':id/invoice')
  generateInvoice(@Param('id') orderId: number) {
    return this.ordersService.generateInvoice(orderId);
  }

  @Get(':id/invoice')
  getInvoiceByOrderId(@Param('id') orderId: number) {
    return this.ordersService.getInvoiceByOrderId(orderId);
  }
}
