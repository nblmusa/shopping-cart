import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SWAGGER_API_ROOT = 'api/docs';
export const SWAGGER_API_NAME = 'Shopping Cart';
export const SWAGGER_API_DESCRIPTION = 'Simple Shopping Cart API';
export const SWAGGER_API_CURRENT_VERSION = '1.0';

export const initializeSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
};
