import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  lastname: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(255)
  avatar?: string;
}
//clonar y modificar la clase createprofiledto poniendo todos las columnascomo opcionales
//usando PartialType de @nestjs/mapped-types extender la clase CreateProfileDto
export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
//sobrescribir las propiedades para que no sean opcional como en el createprofiledto
//pero solo la propiedad avatar se sobreescribe
/*
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  avatar?: string;
  */
