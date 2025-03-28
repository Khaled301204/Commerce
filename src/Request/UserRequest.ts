import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "../entity/User";

export class AddUser{
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsString()
    @IsNotEmpty()
    gender: string;
    
    @IsOptional()
    @IsDate()
    birthdate: Date;

    @IsEnum(UserRole)
    role: UserRole;
}