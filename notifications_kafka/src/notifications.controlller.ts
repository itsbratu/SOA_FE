import { Controller } from '@nestjs/common';
import { NotificationService } from './notifications.service';

@Controller()
export class AppController {
  constructor(private readonly appService: NotificationService) {}
}
