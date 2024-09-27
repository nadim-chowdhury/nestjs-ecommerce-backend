import { IsEmail, IsNotEmpty, IsString, IsMobilePhone } from 'class-validator';

export class CreateSellerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsMobilePhone('en-IN')
  mobileNumber: string;

  @IsString()
  gstin?: string;

  @IsString()
  udyamRegistrationNumber?: string;

  @IsString()
  shopFrontPhoto?: string;

  @IsString()
  shopRightPhoto?: string;

  @IsString()
  shopStreetPhoto?: string;
}
