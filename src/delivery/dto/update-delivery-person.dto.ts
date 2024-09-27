import { IsOptional, IsString, IsMobilePhone, IsEmail } from 'class-validator';

export class UpdateDeliveryPersonDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsMobilePhone('en-IN')
  mobileNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  vehicleDetails?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  idProof?: string;
}
