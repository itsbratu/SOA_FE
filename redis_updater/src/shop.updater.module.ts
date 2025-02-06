import { Module } from '@nestjs/common';
import { ShopUpdaterController } from './shop.updater.controller';
import { ShopUpdaterService } from './shop.updater.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'SHOP_LOGS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'shop_logs',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ShopUpdaterController],
  providers: [ShopUpdaterService],
})
export class ShopUpdaterModule {}
