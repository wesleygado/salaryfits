import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockTransactionService } from './stock-transaction.service';

@Controller('stock-transaction')
export class StockControlController {
  constructor(private readonly stockControlService: StockTransactionService) {}

  @Post()
  create(@Body() createStockControlDto) {
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
  update(@Param('id') id: string, @Body() updateStockControlDto) {
    return this.stockControlService.update(+id, updateStockControlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockControlService.remove(+id);
  }
}
