import { IsNotEmpty, IsString, IsOptional, MinLength, MaxLength, IsBoolean, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  content: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  coverImage?: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(500)
  summary: string;

  //usuario que crea el post, se incluye en el DTO para asignarlo al post creado
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
