import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global CORS
  app.enableCors();

  // Add global prefix
  app.setGlobalPrefix('/api');

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for your application')
    .setVersion('1.0')
    .addBearerAuth() // Enable JWT Bearer Auth for Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Start listening on port 8000
  await app.listen(8000);
}

bootstrap();
