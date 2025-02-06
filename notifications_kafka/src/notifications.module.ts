import { Module } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { NotificationGateway } from './notifications.gateaway';

@Module({
  providers: [NotificationService, NotificationGateway]
})
export class NotificatioModule {}
