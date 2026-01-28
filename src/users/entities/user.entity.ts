import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Profile } from './profile.entity';

//decorator to define an entity and map it to the 'users' table in the database
@Entity({ name: 'users' })
export class User {
  //decorator to define a primary generated column
  @PrimaryGeneratedColumn()
  id: number;

  //decorator to define a regular column for password storage
  @Column({ type: 'varchar', length: 255 })
  password: string;

  //decorator to define a unique column for email addresses
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  //decorator to automatically manage created timestamp
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at', nullable: false })
  createdAt: Date;

  //decorator to automatically manage updated timestamp
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at', nullable: false })
  updatedAt: Date;

  //creando relacion uno a uno entidad user con profile
  //relacion uno a uno obligatoria y Operaciones en cascada (insert, update, remove) de usuario a perfil
  @OneToOne(() => Profile, { nullable: false, cascade: ['insert', 'update', 'remove'], onDelete: 'CASCADE' })
  //definiendo la columna de union
  @JoinColumn({ name: 'profile_id' })
  //definiendo la propiedad profile
  profile: Profile;
}
