import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ShopLogsModule } from './shop.logs.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ShopLogsModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'shop_logs',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();

  Logger.log('Shop Logs Microservice is listening', 'ShopLogsMicroservice');
}

bootstrap();
