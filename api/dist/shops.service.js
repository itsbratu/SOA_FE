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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const microservices_1 = require("@nestjs/microservices");
const fs = require("fs");
const path = require("path");
const schedule_1 = require("@nestjs/schedule");
let ShopService = class ShopService {
    constructor(redisClient, shopLogsClient) {
        this.redisClient = redisClient;
        this.shopLogsClient = shopLogsClient;
        this.shops = [];
        this.loadShops();
    }
    async loadShops() {
        const filePath = path.join(__dirname, '..', 'shops-data.json');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            this.shops = JSON.parse(data);
            await Promise.all(this.shops.map((shop) => this.setIncome(shop.id, shop.income)));
        }
    }
    saveShops() {
        const filePath = path.join(__dirname, '..', 'shops-data.json');
        fs.writeFileSync(filePath, JSON.stringify(this.shops, null, 2), 'utf8');
    }
    create(createShopDto) {
        const newShop = {
            id: (0, uuid_1.v4)(),
            name: createShopDto.name,
            income: createShopDto.income,
            openedAt: createShopDto.openedAt,
            location: createShopDto.location
        };
        this.shops.push(newShop);
        this.setIncome(newShop.id, newShop.income);
        this.saveShops();
        this.shopLogsClient.emit('shop_operations', { shop: newShop, operation: 'CREATE' });
        return newShop;
    }
    update(id, updateShopDto) {
        const shop = this.findOne(id);
        Object.assign(shop, updateShopDto);
        this.shopLogsClient.emit('shop_operations', { shop, operation: 'UPDATE' });
        this.saveShops();
        return shop;
    }
    delete(id) {
        const shopIndex = this.shops.findIndex((shop) => shop.id === id);
        if (shopIndex === -1) {
            throw new common_1.NotFoundException(`Shop with ID ${id} not found`);
        }
        const removedShop = this.shops.splice(shopIndex, 1)[0];
        this.shopLogsClient.emit('shop_operations', { shop: removedShop, operation: 'DELETE' });
        this.saveShops();
    }
    findOne(id) {
        const shop = this.shops.find((shop) => shop.id === id);
        if (!shop) {
            throw new common_1.NotFoundException(`Shop with ID ${id} not found`);
        }
        this.shopLogsClient.emit('shop_operations', { shop, operation: 'RETRIEVE' });
        return shop;
    }
    findAll() {
        return this.shops;
    }
    async getShopIncome(id) {
        return await this.redisClient.send({ cmd: 'get-shop-income' }, id).toPromise();
    }
    async setIncome(id, income) {
        await this.redisClient.send({ cmd: 'set-shop-income' }, { id, income }).toPromise();
    }
    async updateIncomes() {
        const updatedShops = await Promise.all(this.shops.map(async (shop) => {
            const income = await this.getShopIncome(shop.id);
            return { ...shop, income };
        }));
        this.shops = updatedShops;
        this.saveShops();
    }
};
exports.ShopService = ShopService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShopService.prototype, "updateIncomes", null);
exports.ShopService = ShopService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REDIS_UPDATER')),
    __param(1, (0, common_1.Inject)('SHOP_LOGS_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], ShopService);
//# sourceMappingURL=shops.service.js.map