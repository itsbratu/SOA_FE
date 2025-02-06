import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ShopsController } from './shops.controller';
import { ShopService } from './shops.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'auth_service',
          port: 3002
        },
      },
      {
        name: 'REDIS_UPDATER',
        transport: Transport.REDIS,
        options: {
          host: 'redis_instance_1',  // Replace with the container name of Redis
          port: 6379,
        },
      },
      {
        name: 'SHOP_LOGS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'shop_logs',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'shop-service-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [ShopsController],
  providers: [ShopService],
})
export class ShopsModule {}
