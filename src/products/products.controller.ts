import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: 'Get all products' })
  @Get()
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @ApiOperation({ summary: 'Get product details by ID' })
  @Get(':id')
  findProductById(@Param('id') id: number) {
    return this.productsService.findProductById(id);
  }

  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiBody({ type: UpdateProductDto })
  @Patch(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @Post('categories')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productsService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @Get('categories')
  findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiBody({ type: UpdateCategoryDto })
  @Patch('categories/:id')
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.productsService.updateCategory(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete a product by ID' })
  @Delete(':id')
  removeProduct(@Param('id') id: number) {
    return this.productsService.removeProduct(id);
  }

  @ApiOperation({ summary: 'Delete a category by ID' })
  @Delete('categories/:id')
  removeCategory(@Param('id') id: number) {
    return this.productsService.removeCategory(id);
  }
}
