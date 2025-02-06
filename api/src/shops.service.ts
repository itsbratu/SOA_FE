import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import * as fs from 'fs';
import * as path from 'path';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Shop } from './shop';
import { CreateShopDto } from './create-shop-dto';
import { UpdateShopDto } from './update-shop-dtop';

@Injectable()
export class ShopService {
  private shops: Shop[] = [];

  constructor(
    @Inject('REDIS_UPDATER') private readonly redisClient: ClientProxy,
    @Inject('SHOP_LOGS_SERVICE') private readonly shopLogsClient: ClientProxy,
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka

  ) {
    this.loadShops();
  }

  private async loadShops(): Promise<void> {
    const filePath = path.join(__dirname, '..', 'shops-data.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      this.shops = JSON.parse(data);

      await Promise.all(this.shops.map((shop) => this.setIncome(shop.id, shop.income)));
    }
  }

  private saveShops(): void {
    const filePath = path.join(__dirname, '..', 'shops-data.json');
    fs.writeFileSync(filePath, JSON.stringify(this.shops, null, 2), 'utf8');
  }

  create(createShopDto: CreateShopDto): Shop {
    const newShop: Shop = {
      id: uuidv4(),
      name: createShopDto.name,
      income: createShopDto.income,
      openedAt: createShopDto.openedAt,
      location: createShopDto.location
    };

    this.shops.push(newShop);
    this.setIncome(newShop.id, newShop.income)
    this.saveShops();

    //RabbitMQ - Create
    this.shopLogsClient.emit('shop_operations', { shop: newShop, operation: 'CREATE' });

    return newShop;
  }

  update(id: string, updateShopDto: UpdateShopDto): Shop {
    const shop = this.findOne(id);
    Object.assign(shop, updateShopDto);

    //RabbitMQ - Update
    this.shopLogsClient.emit('shop_operations', { shop, operation: 'UPDATE' });
      
    this.saveShops();
    return shop;
  }

  delete(id: string): void {
    const shopIndex = this.shops.findIndex((shop) => shop.id === id);
    if (shopIndex === -1) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }
    const removedShop = this.shops.splice(shopIndex, 1)[0];
  
    // RabbitMQ - Delete
    this.shopLogsClient.emit('shop_operations', { shop: removedShop, operation: 'DELETE' });
  
    this.saveShops();
  }
  
  findOne(id: string): Shop {
    const shop = this.shops.find((shop) => shop.id === id);
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }

    //RabbitMQ - find
    this.shopLogsClient.emit('shop_operations', { shop, operation: 'RETRIEVE' });

    return shop;
  }

  findAll(): Shop[] {
    return this.shops;
  }

  // Redis 
  async getShopIncome(id: string): Promise<number> {
    return await this.redisClient.send<number>({ cmd: 'get-shop-income' }, id).toPromise();
  }

  async setIncome(id: string, income: number): Promise<void> {
    await this.redisClient.send<void>({ cmd: 'set-shop-income' }, { id, income }).toPromise();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async updateIncomes(): Promise<void> {
    const updatedShops = await Promise.all(
      this.shops.map(async (shop) => {
        const income = await this.getShopIncome(shop.id);
        this.kafkaClient.emit('shop.income.updated', { id: shop.id, income });
        return { ...shop, income };
      }),
    );
    this.shops = updatedShops;
    this.saveShops();
  }
}
