import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>) { }

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
      throw new NotFoundException(`Stock by id: ${id} not found`);
    }

    return stock;
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    const updateResult = await this.stockRepository.update(id, updateStockDto);

    if (!updateResult.affected) {
      throw new NotFoundException(`stock by id: ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteResult = await this.stockRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Stock by id: ${id} not found`);
    }
    return { message: 'The Stock has been successfully deleted.' };
  }
}
