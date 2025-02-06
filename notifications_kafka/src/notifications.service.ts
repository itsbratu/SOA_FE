import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ClientKafka, Transport, Client } from '@nestjs/microservices';
import { NotificationGateway } from './notifications.gateaway';

@Injectable()
export class NotificationService implements OnModuleInit {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly notificationGateway: NotificationGateway) {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'notification-consumer',
      },
    },
  })
  private readonly kafkaClient: ClientKafka;

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('shop.income.updated');
    await this.kafkaClient.connect();
    this.logger.log('Kafka client connected successfully');
  }

  handleIncomeUpdate(message): void {
    const { id, income } = message.value as { id: string; income: number };
    const threshold = 10000;

    if (income > threshold) {
      this.sendNotification(id, income);
    }
  }

  private sendNotification(shopId: string, income: number): void {
    this.logger.warn(`Notification: Shop with ID ${shopId} has exceeded the income threshold with income ${income}.`);
    this.notificationGateway.sendNotificationToClient(shopId, income);
  }
}
