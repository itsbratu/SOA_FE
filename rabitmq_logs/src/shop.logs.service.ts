import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class ShopLogsService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'shop_logs',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async logShopOperation(message: any): Promise<void> {
    await this.client.emit('shop_operations', message).toPromise();
  }

  async logIncomeOperation(message: any): Promise<void> {
    await this.client.emit('income_operations', message).toPromise();
  }
}
