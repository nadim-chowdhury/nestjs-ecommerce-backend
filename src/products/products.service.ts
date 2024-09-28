import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Inventory } from './entities/inventory.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  // Create a new product
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, stockQuantity, bulkPricing, ...rest } =
      createProductDto;

    // Fetch the Category entity based on the categoryId
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Create and save the inventory
    const inventory = this.inventoryRepository.create({
      stockQuantity,
      bulkPricing,
    });
    await this.inventoryRepository.save(inventory);

    // Create the product and associate it with the Category and Inventory
    const product = this.productRepository.create({
      ...rest,
      category, // Assign the full Category entity here
      inventory,
    });

    // Save the product
    return this.productRepository.save(product);
  }

  // Update product
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['inventory', 'category'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const { categoryId, stockQuantity, bulkPricing, ...rest } =
      updateProductDto;

    // Update the category if provided
    if (categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.category = category;
    }

    // Update inventory if necessary
    if (stockQuantity !== undefined || bulkPricing !== undefined) {
      Object.assign(product.inventory, {
        stockQuantity: stockQuantity ?? product.inventory.stockQuantity,
        bulkPricing: bulkPricing ?? product.inventory.bulkPricing,
      });
      await this.inventoryRepository.save(product.inventory);
    }

    Object.assign(product, rest);

    return this.productRepository.save(product);
  }

  // Find all products
  async findAllProducts(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['inventory', 'category'],
    });
  }

  // Find a product by ID
  async findProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['inventory', 'category'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  // Delete product by ID
  async removeProduct(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  // Delete category by ID
  async removeCategory(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  // Create a new category
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  // Update a category
  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    Object.assign(category, updateCategoryDto);

    return this.categoryRepository.save(category);
  }

  // Find all categories
  async findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['products'] });
  }
}
