import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ShopUpdaterService } from './shop.updater.service';

@Controller()
export class ShopUpdaterController {
  private readonly logger = new Logger(ShopUpdaterController.name);

  constructor(private readonly redisService: ShopUpdaterService) {}

  @MessagePattern({ cmd: 'set-shop-income' })
  async setIncome(data: { id: string; income: number }): Promise<void> {
    await this.redisService.setIncome(data.id, data.income);
  }
  
  @MessagePattern({ cmd: 'get-shop-income' })
  async getIncome(id: string): Promise<number> {
    const income = await this.redisService.getIncome(id);
    return income;
  }
}
