"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopUpdaterModule = void 0;
const common_1 = require("@nestjs/common");
const shop_updater_controller_1 = require("./shop.updater.controller");
const shop_updater_service_1 = require("./shop.updater.service");
const schedule_1 = require("@nestjs/schedule");
const microservices_1 = require("@nestjs/microservices");
let ShopUpdaterModule = class ShopUpdaterModule {
};
exports.ShopUpdaterModule = ShopUpdaterModule;
exports.ShopUpdaterModule = ShopUpdaterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            microservices_1.ClientsModule.register([
                {
                    name: 'SHOP_LOGS_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: ['amqp://localhost:5672'],
                        queue: 'shop_logs',
                        queueOptions: {
                            durable: false,
                        },
                    },
                },
            ]),
        ],
        controllers: [shop_updater_controller_1.ShopUpdaterController],
        providers: [shop_updater_service_1.ShopUpdaterService],
    })
], ShopUpdaterModule);
//# sourceMappingURL=shop.updater.module.js.map