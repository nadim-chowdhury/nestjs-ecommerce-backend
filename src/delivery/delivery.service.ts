import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryPerson } from './entities/delivery-person.entity';
import { CreateDeliveryPersonDto } from './dto/create-delivery-person.dto';
import { UpdateDeliveryPersonDto } from './dto/update-delivery-person.dto';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(DeliveryPerson)
    private deliveryPersonRepository: Repository<DeliveryPerson>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  // Create a new delivery person
  async createDeliveryPerson(
    createDeliveryPersonDto: CreateDeliveryPersonDto,
  ): Promise<DeliveryPerson> {
    const deliveryPerson = this.deliveryPersonRepository.create(
      createDeliveryPersonDto,
    );
    return this.deliveryPersonRepository.save(deliveryPerson);
  }

  // Update delivery person details
  async updateDeliveryPerson(
    id: number,
    updateDeliveryPersonDto: UpdateDeliveryPersonDto,
  ): Promise<DeliveryPerson> {
    const deliveryPerson = await this.findOneDeliveryPerson(id);
    if (!deliveryPerson) {
      throw new NotFoundException('Delivery person not found');
    }
    Object.assign(deliveryPerson, updateDeliveryPersonDto);
    return this.deliveryPersonRepository.save(deliveryPerson);
  }

  // Find delivery person by ID
  async findOneDeliveryPerson(id: number): Promise<DeliveryPerson> {
    const deliveryPerson = await this.deliveryPersonRepository.findOne({
      where: { id },
    });
    if (!deliveryPerson) {
      throw new NotFoundException('Delivery person not found');
    }
    return deliveryPerson;
  }

  // Assign order to delivery person
  async assignOrderToDeliveryPerson(
    orderId: number,
    deliveryPersonId: number,
  ): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['deliveryPerson'], // Ensure related entities are loaded
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const deliveryPerson = await this.findOneDeliveryPerson(deliveryPersonId);
    if (!deliveryPerson) {
      throw new NotFoundException('Delivery person not found');
    }

    order.deliveryPerson = deliveryPerson;
    order.status = 'shipped'; // Update the order status, assuming the order is now assigned to delivery
    return this.orderRepository.save(order);
  }

  // Update order status (e.g., "Picked Up", "Delivered", etc.)
  async updateOrderStatus(orderId: number, status: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = status; // Update the order status
    return this.orderRepository.save(order);
  }
}
