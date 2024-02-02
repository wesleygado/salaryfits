import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StockTransaction } from './entities/stock-transaction.entity';
import { Repository } from 'typeorm';
import { StockService } from 'src/stock/stock.service';
import { TransactionType } from './entities/transaction-type.enum';
import { Stock } from 'src/stock/entities/stock.entity';
import { UpdateStockTransactionDto } from './dto/update-stock-transaction.dto';
import { UpdateStockDto } from 'src/stock/dto/update-stock.dto';
@Injectable()
export class StockTransactionService {
  constructor(@InjectRepository(StockTransaction)
  private stockTransactionRepository: Repository<StockTransaction>,
    private stockService: StockService) { }

  async create(createStockTransactionDto: CreateStockTransactionDto) {
    const transaction = new StockTransaction();
    const stock = await this.stockService.findOne(createStockTransactionDto.stock);
    transaction.stock = stock;
    transaction.quantityTransaction = createStockTransactionDto.quantityTransaction;
    transaction.transitionType = createStockTransactionDto.transitionType;
    transaction.quantityBefore = stock.quantity;
    const stockUpdated = await this.updateStockQuantity(stock, transaction);
    transaction.quantityAfter = stockUpdated.quantity;

    return await this.stockTransactionRepository.save(transaction);
  }

  async findAll() {
    return await this.stockTransactionRepository.find();
  }

  async findOne(id: number) {
    return await this.stockTransactionRepository.findOne(
      {
        where: { id: id },
        relations: { stock: true }
      });
  }

  async update(id: number, updateStockTransactionDto: UpdateStockTransactionDto) {
    const stockTransaction = await this.findOne(id);
    const stock = await this.stockService.findOne(stockTransaction.stock.id);
    stockTransaction.quantityTransaction = updateStockTransactionDto.quantityTransaction;
    stockTransaction.transitionType = updateStockTransactionDto.transitionType;
    const stockUpdated = await this.updateStockQuantity(stock, stockTransaction);
    stockTransaction.quantityAfter = stockUpdated.quantity;

    const updateResult = await this.stockTransactionRepository.update(stockTransaction.id, stockTransaction);

    if (!updateResult.affected) {
      throw new NotFoundException(`stock by id: ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteResult = await this.stockTransactionRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Stock Transaction by id: ${id} not found`);
    }
    return { message: 'The Stock Transaction has been successfully deleted.' };
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

    const stockDTO: UpdateStockDto = {
      quantity: stock.quantity,
    }

    return await this.stockService.update(stock.id, stockDTO)
  }
}
