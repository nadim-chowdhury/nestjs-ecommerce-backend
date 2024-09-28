import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator'; // Adjust the path to your decorator

@ApiTags('Reviews') // Group under 'reviews' tag in Swagger UI
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':productId')
  @ApiOperation({ summary: 'Add a review for a product' })
  @ApiParam({
    name: 'productId',
    required: true,
    description: 'ID of the product to review',
  })
  addReview(
    @CurrentUser() user: any, // Use CurrentUser decorator to get user
    @Param('productId') productId: number,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.addReview(user.id, productId, createReviewDto);
  }

  @Patch(':reviewId')
  @ApiOperation({ summary: 'Update an existing review' })
  @ApiParam({
    name: 'reviewId',
    required: true,
    description: 'ID of the review to update',
  })
  updateReview(
    @CurrentUser() user: any, // Use CurrentUser decorator to get user
    @Param('reviewId') reviewId: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.updateReview(user.id, reviewId, updateReviewDto);
  }

  @Delete(':reviewId')
  @ApiOperation({ summary: 'Delete a review' })
  @ApiParam({
    name: 'reviewId',
    required: true,
    description: 'ID of the review to delete',
  })
  deleteReview(
    @CurrentUser() user: any, // Use CurrentUser decorator to get user
    @Param('reviewId') reviewId: number,
  ) {
    return this.reviewsService.deleteReview(user.id, reviewId);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get all reviews for a specific product' })
  @ApiParam({
    name: 'productId',
    required: true,
    description: 'ID of the product',
  })
  getProductReviews(@Param('productId') productId: number) {
    return this.reviewsService.getProductReviews(productId);
  }
}
