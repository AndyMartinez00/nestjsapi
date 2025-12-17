import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    //https://docs.nestjs.com/techniques/configuration#use-module-globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
