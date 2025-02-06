import { Shop } from './models/shop';
import { CreateShopDto } from './models/create-shop-dto';
import { UpdateShopDto } from './models/update-shop-dtop';
import { ClientProxy } from '@nestjs/microservices';
export declare class ShopService {
    private readonly redisClient;
    private readonly shopLogsClient;
    private shops;
    constructor(redisClient: ClientProxy, shopLogsClient: ClientProxy);
    private loadShops;
    private saveShops;
    create(createShopDto: CreateShopDto): Shop;
    update(id: string, updateShopDto: UpdateShopDto): Shop;
    delete(id: string): void;
    findOne(id: string): Shop;
    findAll(): Shop[];
    getShopIncome(id: string): Promise<number>;
    setIncome(id: string, income: number): Promise<void>;
    updateIncomes(): Promise<void>;
}
