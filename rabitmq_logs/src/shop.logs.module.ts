import { Module } from '@nestjs/common';
import { ShopLogsService } from './shop.logs.service';
import { ShopLogsController } from './shop.logs.controller';

@Module({
  providers: [ShopLogsService],
  controllers: [ShopLogsController],
})
export class ShopLogsModule {}
