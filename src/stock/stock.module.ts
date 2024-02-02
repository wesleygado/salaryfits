import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { IsIdMedicineExists } from 'src/validators/validator-medicine-id';
import { Medicine } from 'src/medicine/entities/medicine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, Medicine])],
  controllers: [StockController],
  providers: [StockService, IsIdMedicineExists],
})
export class StockModule { }
