import { Stock } from "src/stock/entities/stock.entity";
import { TransactionType } from "../entities/transaction-type.enum";

export class CreateStockTransactionDto {
  stock: Stock;
  quantityTransaction: number;
  transitionType: TransactionType;
}