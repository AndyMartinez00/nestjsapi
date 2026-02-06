import { Expose } from 'class-transformer';

export class PostResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  summary: string;

  @Expose()
  coverImage: string | null;

  @Expose()
  isDraft: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
