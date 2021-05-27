import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/main/app.module';
import {initializeSwagger} from "./modules/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initializeSwagger(app);
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
