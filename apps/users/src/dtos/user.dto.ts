import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsInt,
  IsStrongPassword,
} from 'class-validator';

export class signUpDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class signInDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

export class updateUserDto {
  @IsString()
  name?: string;

  @IsString()
  profile_image: string;
}

export class createOrderDTO {
  @IsInt()
  no_of_items: number;

  @IsInt()
  total_price: number;
}
