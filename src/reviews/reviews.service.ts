import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async addReview(
    userId: number,
    productId: number,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productsService.findProductById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const review = this.reviewsRepository.create({
      ...createReviewDto,
      user,
      product,
    });
    return this.reviewsRepository.save(review);
  }

  async updateReview(
    userId: number,
    reviewId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.reviewsRepository.findOne({
      where: { id: reviewId, user: { id: userId } },
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    review.rating = updateReviewDto.rating;
    review.comment = updateReviewDto.comment;
    return this.reviewsRepository.save(review);
  }

  async deleteReview(userId: number, reviewId: number): Promise<void> {
    const review = await this.reviewsRepository.findOne({
      where: { id: reviewId, user: { id: userId } },
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.reviewsRepository.remove(review);
  }

  async getProductReviews(productId: number): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: { product: { id: productId } },
      relations: ['user'],
    });
  }
}
