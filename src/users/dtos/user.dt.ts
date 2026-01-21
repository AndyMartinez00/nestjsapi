import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength, ValidateNested } from 'class-validator';
import { CreateProfileDto, UpdateProfileDto } from './profile.dt';
import { Type } from 'class-transformer';
import { OmitType, PartialType } from '@nestjs/mapped-types';

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
/**
 * DTO utilizado para la actualización de un usuario.
 *
 * Este DTO se construye a partir del CreateUserDto, pero:
 * - Convierte todas las propiedades heredadas en opcionales mediante PartialType,
 *   ya que en una actualización no es obligatorio enviar todos los campos.
 * - Omite la propiedad `profile` del CreateUserDto para redefinirla con una
 *   estructura distinta, adecuada para actualizaciones parciales del perfil.
 *
 * De esta forma se separa claramente la lógica de creación y actualización,
 * manteniendo validaciones correctas y evitando inconsistencias.
 */
export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['profile'])) {
  /**
   * Perfil asociado al usuario durante la actualización.
   *
   * - Es opcional, ya que no siempre se requiere modificar el perfil.
   * - Utiliza UpdateProfileDto para permitir actualizaciones parciales.
   * - @ValidateNested garantiza que se validen las propiedades internas del perfil.
   * - @Type transforma el objeto plano recibido en una instancia de UpdateProfileDto.
   */
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  @IsOptional()
  profile: UpdateProfileDto;
}
/*
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
*/
