import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at', nullable: false })
  updatedAt: Date;
}
