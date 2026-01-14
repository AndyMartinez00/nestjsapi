import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
