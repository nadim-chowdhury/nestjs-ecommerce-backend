import {
  IsNotEmpty,
  IsString,
  IsMobilePhone,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class CreateDeliveryPersonDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsMobilePhone('en-IN')
  mobileNumber: string;

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
