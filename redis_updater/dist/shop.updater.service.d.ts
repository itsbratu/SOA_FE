import { ClientProxy } from '@nestjs/microservices';
export declare class ShopUpdaterService {
    private readonly shopLogsClient;
    private client;
    private readonly logger;
    constructor(shopLogsClient: ClientProxy);
    setIncome(id: string, income: number): Promise<void>;
    getIncome(id: string): Promise<number>;
    updateIncomes(): Promise<void>;
}
