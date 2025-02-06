import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ShopUpdaterModule } from './shop.updater.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ShopUpdaterModule, {
    transport: Transport.REDIS,
    options: {
      host: 'redis_instance_1',
      port: 6379
    },
  });

  await app.listen();
  Logger.log('Redis Updater Microservice is listening');
}

bootstrap();
