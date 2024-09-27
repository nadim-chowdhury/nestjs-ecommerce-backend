import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  async createSeller(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.createSeller(createSellerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateSeller(
    @Param('id') id: number,
    @Body() updateSellerDto: UpdateSellerDto,
  ) {
    return this.sellersService.updateSeller(id, updateSellerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':sellerId/products')
  async createProduct(
    @Param('sellerId') sellerId: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.sellersService.createProduct(sellerId, createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('products/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.sellersService.updateProduct(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSeller(@Param('id') id: number) {
    return this.sellersService.findOneSeller(id);
  }
}
