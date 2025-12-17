import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  //registra el controlador y el servicio en el módulo
  controllers: [UsersController],
  providers: [UsersService],
  //expones el servicio para que otros módulos puedan usarlo
  //exports: [UsersService],
})
export class UsersModule {}
