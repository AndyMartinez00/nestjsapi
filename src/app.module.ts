import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    //https://docs.nestjs.com/techniques/configuration#use-module-globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //configure TypeORM module and database connection settings
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', //'192.168.1.22',
      port: 5432,
      username: 'blog_user',
      password: 'blog_password',
      database: 'my_blog_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
