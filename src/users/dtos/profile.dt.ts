import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

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
  @MaxLength(255)
  avatar?: string;
}
