import { Controller, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { ApproveSellerDto } from './dto/approve-seller.dto';
import { ManageInventoryDto } from './dto/manage-inventory.dto';
import { ApproveDeliveryPersonDto } from './dto/approve-delivery-person.dto';

@ApiTags('Admin') // Swagger Tag for Admin endpoints
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('approve-seller')
  @ApiOperation({ summary: 'Approve or reject a seller' })
  @ApiBody({ type: ApproveSellerDto })
  approveSeller(@Body() approveSellerDto: ApproveSellerDto) {
    return this.adminService.approveSeller(approveSellerDto);
  }

  @Patch('approve-delivery-person')
  @ApiOperation({ summary: 'Approve or reject a delivery person' })
  @ApiBody({ type: ApproveDeliveryPersonDto })
  approveDeliveryPerson(
    @Body() approveDeliveryPersonDto: ApproveDeliveryPersonDto,
  ) {
    return this.adminService.approveDeliveryPerson(approveDeliveryPersonDto);
  }

  @Patch('manage-inventory')
  @ApiOperation({ summary: 'Update inventory for a product' })
  @ApiBody({ type: ManageInventoryDto })
  manageInventory(@Body() manageInventoryDto: ManageInventoryDto) {
    return this.adminService.manageInventory(manageInventoryDto);
  }
}
