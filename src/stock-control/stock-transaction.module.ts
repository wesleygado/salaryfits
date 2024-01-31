import { Module } from '@nestjs/common';
import { StockTransactionService } from './stock-transaction.service';
import { StockControlController } from './stock-transaction.controller';

@Module({
  controllers: [StockControlController],
  providers: [StockTransactionService],
})
export class StockTransactionModule {}
