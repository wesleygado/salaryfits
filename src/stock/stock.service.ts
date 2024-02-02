import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Between, Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StockTransaction } from 'src/stock-transaction/entities/stock-transaction.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    @InjectRepository(StockTransaction)
    private stockTransationRepository: Repository<StockTransaction>) { }

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    const stock = this.stockRepository.create(createStockDto);
    return await this.stockRepository.save(stock);
  }

  async findAll(): Promise<Stock[]> {
    return await this.stockRepository.find({ relations: { medicine: true } });
  }

  async findOne(id: number): Promise<Stock> {

    const stock = await this.stockRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        medicine: true,
        stockTransaction: true
      },
    });

    if (!stock) {
      throw new NotFoundException(`Estoque do medicamento de id: ${id} não encontrado`);
    }

    return stock;
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    const updateResult = await this.stockRepository.update(id, updateStockDto);

    if (!updateResult.affected) {
      throw new NotFoundException(`Estoque do medicamento de id: ${id} não encontrado`);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteResult = await this.stockRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Estoque do medicamento de id: ${id} não encontrado`);
    }
    return { message: 'O Estoque do medicamento foi excluido com sucesso' };
  }

  async updateStockByStockTransaction(id: number, stock: Stock) {
    const updateResult = await this.stockRepository.update(id, stock);

    if (!updateResult.affected) {
      throw new NotFoundException(`Estoque do medicamento de id: ${id} não encontrado`);
    }

    return this.findOne(id);
  }

  async allTransactionsStocks() {
    const allTransatcions = await this.stockRepository.find({ relations: { medicine: true, stockTransaction: true } });
    const quantityStock = allTransatcions.map((stock) => stock.quantity);
    const total = quantityStock.reduce((total, quantityStock) => total + quantityStock, 0)
    return { all_quantity_general_stock: total, all_transactions: allTransatcions };
  }

  async allTransactionsStocksByTime(startDay: number, startMonth: number, startYear: number, endDay: number, endMonth: number, endYear: number) {
    const startDate = new Date(`${startYear}-${startMonth}-${startDay}`);
    const endDate = new Date(`${endYear}-${endMonth}-${endDay}`);

    const allTransatcions = await this.stockTransationRepository.find({
      where: {
        createdAt: Between(startDate, endDate)
      },
      relations: {
        stock: true,
      },
    });

    return {
      report_start_date: startDate,
      report_end_date: endDate, transactions: allTransatcions,
    };
  }

  async findStockTransactionsByStock(id: number, startDay: number, startMonth: number, startYear: number, endDay: number, endMonth: number, endYear: number) {
    const startDate = new Date(`${startYear}-${startMonth}-${startDay}`);
    const endDate = new Date(`${endYear}-${endMonth}-${endDay}`);
    const stockTransactionsReport = await this.stockRepository.findOne({
      where: {
        id: id,
        stockTransaction: {
          createdAt: Between(startDate, endDate)
        }
      },
      relations: {
        medicine: true,
        stockTransaction: true
      },
    });

    if(!stockTransactionsReport) {
      throw new NotFoundException('Não há transações correspondentes')
    }

    return {
      Informations: {
        quantity_stock_now: stockTransactionsReport.quantity,
        report_start_date: startDate,
        report_end_date: endDate
      }, stock_report: stockTransactionsReport
    }

  }
}
