import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './entities/seller.entity';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { Product } from 'src/products/entities/product.entity';
import { Category } from 'src/products/entities/category.entity';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(Seller) private sellersRepository: Repository<Seller>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>, // Inject Category repository
  ) {}

  // Create new seller
  async createSeller(createSellerDto: CreateSellerDto): Promise<Seller> {
    const seller = this.sellersRepository.create(createSellerDto);
    return this.sellersRepository.save(seller);
  }

  // Update seller details
  async updateSeller(
    id: number,
    updateSellerDto: UpdateSellerDto,
  ): Promise<Seller> {
    const seller = await this.findOneSeller(id);
    Object.assign(seller, updateSellerDto);
    return this.sellersRepository.save(seller);
  }

  // Find seller by ID
  async findOneSeller(id: number): Promise<Seller> {
    const seller = await this.sellersRepository.findOneBy({ id });
    if (!seller) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }
    return seller;
  }

  // Create product for a seller
  async createProduct(
    sellerId: number,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const seller = await this.findOneSeller(sellerId);

    // Fetch Category entity using categoryId from DTO
    const category = await this.categoryRepository.findOne({
      where: { id: createProductDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createProductDto.categoryId} not found`,
      );
    }

    // Create and associate product with seller and category
    const product = this.productsRepository.create({
      ...createProductDto,
      seller, // Associate seller entity
      category, // Associate category entity
    });

    return this.productsRepository.save(product);
  }

  // Update product details
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOneProduct(id);

    // If updating the category, fetch the new category entity
    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateProductDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updateProductDto.categoryId} not found`,
        );
      }
      product.category = category; // Update the category
    }

    // Update product details
    Object.assign(product, updateProductDto);

    return this.productsRepository.save(product);
  }

  // Find product by ID
  async findOneProduct(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['seller', 'category'], // Include related seller and category
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Implement sales analytics logic here, if needed
}
