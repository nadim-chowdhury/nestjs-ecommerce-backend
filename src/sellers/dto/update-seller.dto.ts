import { IsOptional, IsString, IsMobilePhone, IsEmail } from 'class-validator';

export class UpdateSellerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsMobilePhone('en-IN')
  mobileNumber?: string;

  @IsOptional()
  @IsString()
  gstin?: string;

  @IsOptional()
  @IsString()
  udyamRegistrationNumber?: string;

  @IsOptional()
  @IsString()
  shopFrontPhoto?: string;

  @IsOptional()
  @IsString()
  shopRightPhoto?: string;

  @IsOptional()
  @IsString()
  shopStreetPhoto?: string;
}
