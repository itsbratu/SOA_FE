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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopLogsService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let ShopLogsService = class ShopLogsService {
    constructor() {
        this.client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'shop_logs',
                queueOptions: {
                    durable: false,
                },
            },
        });
    }
    async logShopOperation(message) {
        await this.client.emit('shop_operations', message).toPromise();
    }
    async logIncomeOperation(message) {
        await this.client.emit('income_operations', message).toPromise();
    }
};
exports.ShopLogsService = ShopLogsService;
exports.ShopLogsService = ShopLogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ShopLogsService);
//# sourceMappingURL=shop.logs.service.js.map