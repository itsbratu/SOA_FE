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
var ShopUpdaterController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopUpdaterController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const shop_updater_service_1 = require("./shop.updater.service");
let ShopUpdaterController = ShopUpdaterController_1 = class ShopUpdaterController {
    constructor(redisService) {
        this.redisService = redisService;
        this.logger = new common_1.Logger(ShopUpdaterController_1.name);
    }
    async setIncome(data) {
        await this.redisService.setIncome(data.id, data.income);
    }
    async getIncome(id) {
        const income = await this.redisService.getIncome(id);
        return income;
    }
};
exports.ShopUpdaterController = ShopUpdaterController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'set-shop-income' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopUpdaterController.prototype, "setIncome", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-shop-income' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShopUpdaterController.prototype, "getIncome", null);
exports.ShopUpdaterController = ShopUpdaterController = ShopUpdaterController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [shop_updater_service_1.ShopUpdaterService])
], ShopUpdaterController);
//# sourceMappingURL=shop.updater.controller.js.map