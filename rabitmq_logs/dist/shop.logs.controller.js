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
var ShopLogsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopLogsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let ShopLogsController = ShopLogsController_1 = class ShopLogsController {
    constructor() {
        this.logger = new common_1.Logger(ShopLogsController_1.name);
        this.operationIcons = {
            CREATE: '✨',
            UPDATE: '📝',
            DELETE: '🗑️',
            RETRIEVE: '🔍',
        };
    }
    handleShopOperation(data) {
        const icon = this.operationIcons[data.operation] || '⚙️';
        const formattedShopDetails = JSON.stringify(data.shop, null, 2);
        const logMessage = `
      Shop Operation ${icon} 
      ===================
      Operation: ${data.operation}
      -------------------
      Details: 
      ${formattedShopDetails}
      ===================`;
        this.logger.log(logMessage);
    }
    handleIncomeOperation(data) {
        const logMessage = `📝 Updated the shop with the id ${data.id} with the income of ${data.updatedIncome} (new income : ${data.newIncome})`;
        this.logger.log(logMessage);
    }
};
exports.ShopLogsController = ShopLogsController;
__decorate([
    (0, microservices_1.MessagePattern)('shop_operations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShopLogsController.prototype, "handleShopOperation", null);
__decorate([
    (0, microservices_1.MessagePattern)('income_operations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShopLogsController.prototype, "handleIncomeOperation", null);
exports.ShopLogsController = ShopLogsController = ShopLogsController_1 = __decorate([
    (0, common_1.Controller)('shop-logs')
], ShopLogsController);
//# sourceMappingURL=shop.logs.controller.js.map