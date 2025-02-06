import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('shop-logs')
export class ShopLogsController {
  private readonly logger = new Logger(ShopLogsController.name);

  private operationIcons: { [key: string]: string } = {
    CREATE: '✨',
    UPDATE: '📝',
    DELETE: '🗑️',
    RETRIEVE: '🔍',
  };

  @MessagePattern('shop_operations')
  handleShopOperation(data: { shop: any; operation: string }) {
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

  @MessagePattern('income_operations')
  handleIncomeOperation(data: { id: string; updatedIncome: string, newIncome: string }) {
    const logMessage = `📝 Updated the shop with the id ${data.id} with the income of ${data.updatedIncome} (new income : ${data.newIncome})`;

    this.logger.log(logMessage);
  }
}
