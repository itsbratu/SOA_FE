export declare class ShopLogsService {
    private client;
    constructor();
    logShopOperation(message: any): Promise<void>;
    logIncomeOperation(message: any): Promise<void>;
}
