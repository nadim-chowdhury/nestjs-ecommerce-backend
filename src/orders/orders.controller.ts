import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@ApiTags('Orders') // Swagger group tag
@ApiBearerAuth() // Apply bearer auth for JWT protection
@Controller('orders')
@UseGuards(JwtAuthGuard) // Protect the routes with JWT Auth Guard
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto })
  @Post()
  createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto, req.user.id);
  }

  @ApiOperation({ summary: 'Get all orders for a user' })
  @Get()
  findOrdersByUser(@Request() req) {
    return this.ordersService.findOrdersByUser(req.user.id);
  }

  @ApiOperation({ summary: 'Get order details by ID' })
  @Get(':id')
  findOrderById(@Param('id') id: number) {
    return this.ordersService.findOrderById(id);
  }

  @ApiOperation({ summary: 'Update order details by ID' })
  @ApiBody({ type: UpdateOrderDto })
  @Patch(':id')
  updateOrder(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Generate an invoice for an order' })
  @Post(':id/invoice')
  generateInvoice(@Param('id') orderId: number) {
    return this.ordersService.generateInvoice(orderId);
  }

  @ApiOperation({ summary: 'Get the invoice for an order' })
  @Get(':id/invoice')
  getInvoiceByOrderId(@Param('id') orderId: number) {
    return this.ordersService.getInvoiceByOrderId(orderId);
  }
}
