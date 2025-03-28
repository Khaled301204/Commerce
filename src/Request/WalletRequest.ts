import {
    IsNotEmpty,
    IsNumber,
    Min,
    Max,
    IsString,
    IsOptional,
  } from "class-validator";
  
  export class AddWallet {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;
  
    @IsNumber()
    @IsNotEmpty()
    balance: number;
  } 
  
  export class UpdateWallet {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;
  
    @IsNumber()
    @IsNotEmpty()
    balance: number;
  
  }