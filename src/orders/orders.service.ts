import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Invoice } from './entities/invoice.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>, // Inject UserRepository
  ) {}

  // Create a new order
  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: number,
  ): Promise<Order> {
    const { items, total } = createOrderDto;
    const orderItems: OrderItem[] = [];

    // Find user
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Create each order item
    for (const item of items) {
      const product = await this.productsRepository.findOne({
        where: { id: item.productId },
      });
      if (!product) {
        throw new NotFoundException(
          `Product with ID ${item.productId} not found`,
        );
      }

      const orderItem = this.orderItemsRepository.create({
        product,
        quantity: item.quantity,
        price: product.price * item.quantity,
      });

      orderItems.push(orderItem);
    }

    // Save all order items first
    await this.orderItemsRepository.save(orderItems);

    // Create and save the order
    const order = this.ordersRepository.create({
      user,
      total,
      items: orderItems, // Items already saved, so can be assigned directly
    });

    return this.ordersRepository.save(order);
  }

  // Find all orders for a user
  async findOrdersByUser(userId: number): Promise<Order[]> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.ordersRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
  }

  // Find order by ID
  async findOrderById(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['items', 'items.product', 'user'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  // Update order status
  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.findOrderById(id);
    Object.assign(order, updateOrderDto);
    return this.ordersRepository.save(order);
  }

  // Generate an invoice for the order
  async generateInvoice(orderId: number): Promise<Invoice> {
    const order = await this.findOrderById(orderId);
    const invoice = this.invoicesRepository.create({
      order,
      total: order.total,
      invoiceFilePath: `/invoices/order-${order.id}.pdf`,
    });

    return this.invoicesRepository.save(invoice);
  }

  // Get invoices for an order
  async getInvoiceByOrderId(orderId: number): Promise<Invoice> {
    const invoice = await this.invoicesRepository.findOne({
      where: { order: { id: orderId } },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    return invoice;
  }
}
