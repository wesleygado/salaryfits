import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('v1/stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Get('report/:id')
  findStockTransactionsByStock(
    @Query('start_day') startDay: number,
    @Query('start_month') startMonth: number,
    @Query('start_year') startYear: number,
    @Query('end_day') endDay: number,
    @Query('end_month') endMonth: number,
    @Query('end_year') endYear: number,
    @Param('id') id: number,
    ) {
    return this.stockService.findStockTransactionsByStock(id, startDay, startMonth, startYear, endDay, endMonth, endYear);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
