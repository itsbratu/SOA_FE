import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ClientProxy } from '@nestjs/microservices';
import Redis from 'ioredis';

@Injectable()
export class ShopUpdaterService {
  private redisClient: Redis; // Use ioredis client
  private readonly logger = new Logger(ShopUpdaterService.name);

  constructor(@Inject('SHOP_LOGS_SERVICE') private readonly shopLogsClient: ClientProxy) {
    // Initialize Redis client with connection details
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'redis_instance_1',
      port: Number(process.env.REDIS_PORT) || 6379,
    });

    // Set up Redis error handling
    this.redisClient.on('error', (err) => this.logger.error('Redis Client Error', err));
  }

  // Set income in Redis
  async setIncome(id: string, income: number): Promise<void> {
    await this.redisClient.set(`shop:${id}:income`, income.toString());
  }

  // Get income from Redis
  async getIncome(id: string): Promise<number> {
    const income = await this.redisClient.get(`shop:${id}:income`);
    return income ? parseFloat(income) : 0;
  }

  // Cron job to update incomes every 10 seconds
  @Cron(CronExpression.EVERY_10_SECONDS)
  async updateIncomes(): Promise<void> {
    try {
      const keys = await this.redisClient.keys('shop:*:income');
      for (const key of keys) {
        const currentIncome = await this.redisClient.get(key);
        const incomeValue = currentIncome ? parseFloat(currentIncome) : 0;

        // Generate a random integer between -100 and 100
        const randomIncomeChange = Math.floor(Math.random() * 201) - 100; // Range: -100 to 100
        const newIncome = incomeValue + randomIncomeChange;

        // Update the Redis value
        await this.redisClient.set(key, newIncome.toString());

        // Emit event to shop logs service
        this.shopLogsClient.emit('income_operations', {
          id: key,
          updatedIncome: String(randomIncomeChange),
          newIncome: String(newIncome),
        });
      }
    } catch (error) {
      this.logger.error('Error updating incomes:', error);
    }
  }
}
