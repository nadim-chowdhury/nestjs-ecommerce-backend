import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './entities/seller.entity';
import { Product } from './entities/product.entity';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(Seller) private sellersRepository: Repository<Seller>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
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
    const product = this.productsRepository.create({
      ...createProductDto,
      seller, // Assuming Product has a seller relation
    });
    return this.productsRepository.save(product);
  }

  // Update product details
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOneProduct(id);
    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  // Find product by ID
  async findOneProduct(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['seller'], // Fetch the associated seller as well
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Sales analytics logic can be implemented based on the orders data
}
