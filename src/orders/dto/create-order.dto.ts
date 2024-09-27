import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  items: CreateOrderItemDto[];

  @IsNotEmpty()
  @IsNumber()
  total: number;
}
