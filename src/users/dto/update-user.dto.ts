import { IsEmail, IsOptional, IsString, IsMobilePhone } from 'class-validator';

export class UpdateUserDto {
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
  password?: string;
}
