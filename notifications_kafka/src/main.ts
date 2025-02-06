import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificatioModule } from './notifications.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificatioModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'notification-service',
      },
    },
  });
  

  await app.startAllMicroservices();
  await app.listen(3006, () => console.log('Notification service is running on port 3001'));
}
bootstrap();