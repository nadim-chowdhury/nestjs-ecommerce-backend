import { IsEmail, IsNotEmpty, IsString, IsMobilePhone } from 'class-validator';

export class CreateUserDto {
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
  password?: string;
}
