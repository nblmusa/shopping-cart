import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/main/app.module';
import { initializeSwagger } from './modules/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initializeSwagger(app);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
