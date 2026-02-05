import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Module({
  //importa las entidades Post para que TypeORM pueda gestionarlas
  imports: [TypeOrmModule.forFeature([Post])],
  //registra el controlador y el servicio en el módulo
  controllers: [PostsController],
  providers: [PostsService],
  //expones el servicio para que otros módulos puedan usarlo
  exports: [PostsService],
})
export class PostsModule {}
