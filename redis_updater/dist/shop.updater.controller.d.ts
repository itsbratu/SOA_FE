import { ShopUpdaterService } from './shop.updater.service';
export declare class ShopUpdaterController {
    private readonly redisService;
    private readonly logger;
    constructor(redisService: ShopUpdaterService);
    setIncome(data: {
        id: string;
        income: number;
    }): Promise<void>;
    getIncome(id: string): Promise<number>;
}
