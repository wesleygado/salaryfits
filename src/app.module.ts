import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicineModule } from './medicine/medicine.module';
import { StockModule } from './stock/stock.module';
import { StockTransactionModule } from './stock-control/stock-transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './database/typeorm-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}),
    MedicineModule,
    StockModule,
    StockTransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
