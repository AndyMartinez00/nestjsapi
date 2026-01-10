import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  //decorator to define a primary generated column
  @PrimaryGeneratedColumn()
  id: number;

  //decorator to define a regular column with specific type and length
  @Column({ type: 'varchar', length: 255 })
  name: string;

  //decorator to define a regular column with specific type and length
  @Column({ type: 'varchar', length: 255, name: 'last_name' })
  lastname: string;

  //decorator to define a regular column with specific type and length
  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  //decorator to automatically manage created timestamp
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at', nullable: false })
  createdAt: Date;

  //decorator to automatically manage updated timestamp
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at', nullable: false })
  updatedAt: Date;
}
