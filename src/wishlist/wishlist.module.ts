import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { UsersModule } from '../users/users.module'; // Import UsersModule for UsersService
import { ProductsModule } from '../products/products.module'; // Import ProductsModule for ProductsService
import { Wishlist } from './entities/wishlist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist]), // Register Wishlist repository
    UsersModule, // Inject UsersService
    ProductsModule, // Inject ProductsService
  ],
  providers: [WishlistService],
  controllers: [WishlistController],
})
export class WishlistModule {}
