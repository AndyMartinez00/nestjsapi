import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

/**
 * DTO utilizado para la actualización de un post.
 *
 * Este DTO se construye a partir del CreatePostDto, pero:
 * - Convierte todas las propiedades heredadas en opcionales mediante PartialType,
 *   ya que en una actualización no es obligatorio enviar todos los campos.
 *
 * De esta forma se permite actualizar parcialmente un post sin enviar todos los campos.
 */
export class UpdatePostDto extends PartialType(CreatePostDto) {}
