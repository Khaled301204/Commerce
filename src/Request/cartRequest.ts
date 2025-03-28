import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class AddCart{
    
    @IsNumber()
    @IsNotEmpty()
    user_id: number;
    
}