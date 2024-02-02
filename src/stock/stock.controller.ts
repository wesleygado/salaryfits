import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/entities/user-role.enum';

@Controller('v1/stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.EMPLOYEE, UserRole.ADMIN)
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.EMPLOYEE, UserRole.ADMIN)
  findAll() {
    return this.stockService.findAll();
  }

  @Get('report/all')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.EMPLOYEE, UserRole.ADMIN)
  reportGeneralAllStockTransactions() {
    return this.stockService.allTransactionsStocks();
  }

  @Get('report/time')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.EMPLOYEE, UserRole.ADMIN)
  reportGeneralSockTransactionsByTime(
    @Query('start_day') startDay: number,
    @Query('start_month') startMonth: number,
    @Query('start_year') startYear: number,
    @Query('end_day') endDay: number,
    @Query('end_month') endMonth: number,
    @Query('end_year') endYear: number,
    ) {
    return this.stockService.allTransactionsStocksByTime(startDay, startMonth, startYear, endDay, endMonth, endYear);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.EMPLOYEE, UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Get('report/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.EMPLOYEE, UserRole.ADMIN)
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
