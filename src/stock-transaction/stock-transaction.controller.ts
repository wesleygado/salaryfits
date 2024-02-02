import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { StockTransactionService } from './stock-transaction.service';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';
import { UpdateStockTransactionDto } from './dto/update-stock-transaction.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/entities/user-role.enum';

@Controller('v1/stock-transactions')
export class StockControlController {
  constructor(private readonly stockControlService: StockTransactionService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createStockControlDto: CreateStockTransactionDto) {
    return this.stockControlService.create(createStockControlDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.EMPLOYEE, UserRole.ADMIN)
  findAll() {
    return this.stockControlService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.EMPLOYEE, UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.stockControlService.findOne(+id);
  }

  /* Somente usuários administrativos podem excluir e atualizar transações,
  pois a alteração dessas transações podem causar incoêrencia com os dados do estoque. */

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: number, @Body() updateStockControlDto: UpdateStockTransactionDto) {
    return this.stockControlService.update(id, updateStockControlDto);
  } 

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.stockControlService.remove(+id);
  }
}
