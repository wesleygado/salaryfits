import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StockTransactionService } from './stock-transaction.service';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';
import { UpdateStockTransactionDto } from './dto/update-stock-transaction.dto';

@Controller('v1/stock-transactions')
export class StockControlController {
  constructor(private readonly stockControlService: StockTransactionService) {}

  @Post()
  create(@Body() createStockControlDto: CreateStockTransactionDto) {
    return this.stockControlService.create(createStockControlDto);
  }

  @Get()
  findAll() {
    return this.stockControlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockControlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateStockControlDto: UpdateStockTransactionDto) {
    return this.stockControlService.update(id, updateStockControlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockControlService.remove(+id);
  }
}
