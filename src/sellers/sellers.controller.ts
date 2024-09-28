import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

@ApiTags('Sellers')
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @ApiOperation({ summary: 'Create a new seller' })
  @Post()
  async createSeller(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.createSeller(createSellerDto);
  }

  @ApiOperation({ summary: 'Update a seller by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateSeller(
    @Param('id') id: number,
    @Body() updateSellerDto: UpdateSellerDto,
  ) {
    return this.sellersService.updateSeller(id, updateSellerDto);
  }

  @ApiOperation({ summary: 'Create a product for a seller by seller ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':sellerId/products')
  async createProduct(
    @Param('sellerId') sellerId: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.sellersService.createProduct(sellerId, createProductDto);
  }

  @ApiOperation({ summary: 'Update a product by product ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('products/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.sellersService.updateProduct(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Get seller details by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSeller(@Param('id') id: number) {
    return this.sellersService.findOneSeller(id);
  }
}
