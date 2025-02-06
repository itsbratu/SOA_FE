"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const shop_logs_module_1 = require("./shop.logs.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(shop_logs_module_1.ShopLogsModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'shop_logs',
            queueOptions: {
                durable: false,
            },
        },
    });
    await app.listen();
    common_1.Logger.log('Shop Logs Microservice is listening', 'ShopLogsMicroservice');
}
bootstrap();
//# sourceMappingURL=main.js.map