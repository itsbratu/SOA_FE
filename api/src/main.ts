import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ShopsModule } from './shops.module';

async function bootstrap() {
  const app = await NestFactory.create(ShopsModule);

  app.enableCors({
    origin: ['http://localhost:9000', 'http://localhost:9001', 'http://localhost:9002'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  })

  app.useLogger(new Logger());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
