import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StockTransaction } from './entities/stock-transaction.entity';
import { Repository } from 'typeorm';
import { StockService } from 'src/stock/stock.service';
import { TransactionType } from './entities/transaction-type.enum';
import { Stock } from 'src/stock/entities/stock.entity';
@Injectable()
export class StockTransactionService {
  constructor(@InjectRepository(StockTransaction)
  private stockTransactionRepository: Repository<StockTransaction>,
  private stockService: StockService) { }

  async create(createStockControlDto: CreateStockTransactionDto) {
    const transaction = this.stockTransactionRepository.create(createStockControlDto);
    const stock = await this.stockService.findOne(transaction.stock.id);
    transaction.quantityBefore = stock.quantity;
    const stockUpdated = await this.updateStockQuantity(stock, transaction);
    transaction.quantityAfter = stockUpdated.quantity;

    return await this.stockTransactionRepository.save(transaction);
  }

  findAll() {
    return `This action returns all stockControl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockControl`;
  }

  update(id: number, updateStockControlDto) {
    return `This action updates a #${id} stockControl`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockControl`;
  }

  private async updateStockQuantity(stock: Stock, transaction: StockTransaction) {
    if (transaction.transitionType === TransactionType.INBOUND) {
      stock.quantity = stock.quantity + transaction.quantityTransaction;
    }

    if (transaction.transitionType === TransactionType.OUTBOUND) {
      stock.quantity = stock.quantity - transaction.quantityTransaction;
    }

    if (stock.quantity < 0) {
      throw new BadRequestException('A transaction has been canceled; there is not enough stock.')
    }

    return await this.stockService.update(stock.id, stock)
  }
}
