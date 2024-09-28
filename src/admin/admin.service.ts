import { Injectable, NotFoundException } from '@nestjs/common';
import { ApproveSellerDto } from './dto/approve-seller.dto';
import { ManageInventoryDto } from './dto/manage-inventory.dto';
import { ApproveDeliveryPersonDto } from './dto/approve-delivery-person.dto';

@Injectable()
export class AdminService {
  // Mocked sellers and products (replace with real repositories)
  private sellers = [{ id: 1, name: 'Seller A', approved: false }];
  private products = [{ id: 1, name: 'Product A', quantity: 50 }];
  // Mocked delivery persons (replace with a real repository)
  private deliveryPersons = [
    { id: 1, name: 'Delivery Person A', approved: false },
    { id: 2, name: 'Delivery Person B', approved: false },
  ];

  // Approve or reject a seller
  approveSeller(approveSellerDto: ApproveSellerDto) {
    const seller = this.sellers.find((s) => s.id === approveSellerDto.sellerId);
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    seller.approved = approveSellerDto.approved;
    return {
      message: `Seller ${approveSellerDto.approved ? 'approved' : 'rejected'} successfully`,
    };
  }

  // Approve or reject a delivery person
  approveDeliveryPerson(approveDeliveryPersonDto: ApproveDeliveryPersonDto) {
    const deliveryPerson = this.deliveryPersons.find(
      (dp) => dp.id === approveDeliveryPersonDto.deliveryPersonId,
    );

    if (!deliveryPerson) {
      throw new NotFoundException('Delivery person not found');
    }

    deliveryPerson.approved = approveDeliveryPersonDto.approved;
    return {
      message: `Delivery person ${
        approveDeliveryPersonDto.approved ? 'approved' : 'rejected'
      } successfully`,
    };
  }

  // Manage inventory for a product
  manageInventory(manageInventoryDto: ManageInventoryDto) {
    const product = this.products.find(
      (p) => p.id === manageInventoryDto.productId,
    );
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.quantity = manageInventoryDto.quantity;
    return {
      message: `Inventory updated to ${manageInventoryDto.quantity} for product ${product.name}`,
    };
  }
}
