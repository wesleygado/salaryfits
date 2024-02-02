import { Module } from '@nestjs/common';
import { StockTransactionService } from './stock-transaction.service';
import { StockControlController } from './stock-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from 'src/stock/entities/stock.entity';
import { StockTransaction } from './entities/stock-transaction.entity';
import { StockService } from 'src/stock/stock.service';
import { IsIdStockExists } from 'src/validators/validator-stock-id';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, StockTransaction])],
  controllers: [StockControlController],
  providers: [StockTransactionService, StockService, IsIdStockExists],
})
export class StockTransactionModule {}
