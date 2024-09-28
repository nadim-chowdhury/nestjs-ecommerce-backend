import { Controller, Post, Delete, Get, Param, Req } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from 'src/common/interfaces/authenticated-request.interface'; // Adjust the path

@ApiTags('Wishlist')
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':productId')
  @ApiOperation({ summary: 'Add a product to the wishlist' })
  @ApiParam({
    name: 'productId',
    required: true,
    description: 'ID of the product to add',
  })
  addToWishlist(
    @Req() req: AuthenticatedRequest,
    @Param('productId') productId: number,
  ) {
    return this.wishlistService.addToWishlist(req.user.id, productId);
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Remove a product from the wishlist' })
  @ApiParam({
    name: 'productId',
    required: true,
    description: 'ID of the product to remove',
  })
  removeFromWishlist(
    @Req() req: AuthenticatedRequest,
    @Param('productId') productId: number,
  ) {
    return this.wishlistService.removeFromWishlist(req.user.id, productId);
  }

  @Get()
  @ApiOperation({ summary: 'View the wishlist' })
  viewWishlist(@Req() req: AuthenticatedRequest) {
    return this.wishlistService.viewWishlist(req.user.id);
  }
}
