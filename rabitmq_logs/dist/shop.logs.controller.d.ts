export declare class ShopLogsController {
    private readonly logger;
    private operationIcons;
    handleShopOperation(data: {
        shop: any;
        operation: string;
    }): void;
    handleIncomeOperation(data: {
        id: string;
        updatedIncome: string;
        newIncome: string;
    }): void;
}
