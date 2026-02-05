import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';

@Module({
  //importa las entidades User y Profile para que TypeORM pueda gestionarlas
  imports: [TypeOrmModule.forFeature([User, Profile])],
  //registra el controlador y el servicio en el módulo
  controllers: [UsersController],
  providers: [UsersService],
  //expones el servicio para que otros módulos puedan usarlo
  exports: [UsersService],
})
export class UsersModule {}
