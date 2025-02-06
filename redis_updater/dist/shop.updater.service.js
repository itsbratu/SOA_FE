"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ShopUpdaterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopUpdaterService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
const schedule_1 = require("@nestjs/schedule");
const microservices_1 = require("@nestjs/microservices");
let ShopUpdaterService = ShopUpdaterService_1 = class ShopUpdaterService {
    constructor(shopLogsClient) {
        this.shopLogsClient = shopLogsClient;
        this.logger = new common_1.Logger(ShopUpdaterService_1.name);
        this.client = (0, redis_1.createClient)({
            url: 'redis://127.0.0.1:6379',
        });
        this.client.on('error', (err) => this.logger.error('Redis Client Error', err));
        this.client.connect();
    }
    async setIncome(id, income) {
        await this.client.set(`shop:${id}:income`, income.toString());
    }
    async getIncome(id) {
        const income = await this.client.get(`shop:${id}:income`);
        return income ? parseFloat(income) : 0;
    }
    async updateIncomes() {
        try {
            const keys = await this.client.keys('shop:*:income');
            for (const key of keys) {
                const currentIncome = await this.client.get(key);
                const incomeValue = currentIncome ? parseFloat(currentIncome) : 0;
                const randomIncomeChange = Math.floor(Math.random() * 201) - 100;
                const newIncome = incomeValue + randomIncomeChange;
                await this.client.set(key, newIncome.toString());
                this.shopLogsClient.emit('income_operations', { id: key, updatedIncome: String(randomIncomeChange), newIncome: String(newIncome) });
            }
        }
        catch (error) {
        }
    }
};
exports.ShopUpdaterService = ShopUpdaterService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShopUpdaterService.prototype, "updateIncomes", null);
exports.ShopUpdaterService = ShopUpdaterService = ShopUpdaterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SHOP_LOGS_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], ShopUpdaterService);
//# sourceMappingURL=shop.updater.service.js.map