import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //permite eliminar propiedades no definidas en los DTOs
      whitelist: true,
      //lanza un error si faltan propiedades requeridas en los DTOs
      forbidNonWhitelisted: true,
      //lanza un error si hay propiedades no definidas en los DTOs
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
