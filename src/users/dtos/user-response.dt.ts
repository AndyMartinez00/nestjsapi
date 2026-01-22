import { Expose, Type } from 'class-transformer';

class ProfileResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  lastname: string;

  @Expose()
  avatar: string | null;
}

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  @Type(() => ProfileResponseDto)
  profile: ProfileResponseDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
