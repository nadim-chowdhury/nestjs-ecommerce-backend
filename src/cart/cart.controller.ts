import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator'; // Import the custom decorator

@ApiTags('Cart') // Group the CartController endpoints under the 'cart' tag in Swagger UI
@ApiBearerAuth() // Indicates that JWT token is required for authorization
@Controller('cart')
@UseGuards(JwtAuthGuard) // Protect all routes in this controller with JWT guard
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add an item to the cart' })
  async addItem(
    @CurrentUser() user: any, // Extract user using @CurrentUser
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    return this.cartService.addItem(user.id, createCartItemDto);
  }

  @Patch('update/:itemId')
  @ApiOperation({ summary: 'Update the quantity of an item in the cart' })
  async updateItem(
    @CurrentUser() user: any, // Extract user using @CurrentUser
    @Param('itemId') itemId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(user.id, itemId, updateCartItemDto);
  }

  @Delete('remove/:itemId')
  @ApiOperation({ summary: 'Remove an item from the cart' })
  async removeItem(
    @CurrentUser() user: any, // Extract user using @CurrentUser
    @Param('itemId') itemId: number,
  ) {
    return this.cartService.removeItem(user.id, itemId);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get the cart summary' })
  async getCartSummary(@CurrentUser() user: any) {
    return this.cartService.getCartSummary(user.id);
  }

  @Post('checkout')
  @ApiOperation({ summary: 'Checkout the items in the cart' })
  async checkout(@CurrentUser() user: any) {
    const cart = await this.cartService.getCartSummary(user.id);
    await this.cartService.clearCart(user.id);
    return { message: 'Checkout successful' };
  }
}
