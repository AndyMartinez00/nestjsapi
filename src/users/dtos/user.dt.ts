import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength, ValidateNested } from 'class-validator';
import { CreateProfileDto } from './profile.dt';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  //relacion con el profilecreation dto
  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile: CreateProfileDto;
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
