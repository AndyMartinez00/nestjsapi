import { User } from '../../users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'cover_image' })
  coverImage: string;

  @Column({ type: 'varchar', length: 500, name: 'summary', nullable: true })
  summary: string;

  @Column({ type: 'boolean', default: true, name: 'is_draft' })
  isDraft: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at', nullable: false })
  updatedAt: Date;
  // Relación con la entidad User (autor del post)
  //nullaeble: true para permitir que un post pueda existir sin un autor asignado (opcional)
  //nullaeble: false si queremos que cada post tenga un autor obligatorio
  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  // Definiendo la columna de unión para la relación con User
  @JoinColumn({ name: 'user_id' })
  // Definiendo la propiedad user como una instancia de User
  user: User;
}
