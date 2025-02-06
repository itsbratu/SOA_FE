"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const shop_updater_module_1 = require("./shop.updater.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(shop_updater_module_1.ShopUpdaterModule, {
        transport: microservices_1.Transport.REDIS,
        options: {
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
        },
    });
    await app.listen();
    common_1.Logger.log('Redis Updater Microservice is listening');
}
bootstrap();
//# sourceMappingURL=main.js.map