import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class signUpDto {
    @IsString()
    full_name: string;
    
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class signInDto{
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password:string;
}

export class updateUserDto {
    @IsString()
    name?: string;

    @IsString()
    profile_image: string;
}
