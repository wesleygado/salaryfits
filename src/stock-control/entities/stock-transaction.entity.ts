import { Stock } from "src/stock/entities/stock.entity";
import { IStockTransaction } from "./stock-transaction.interface";
import { TransactionType } from "./transaction-type.enum";

export class StockTransaction implements IStockTransaction  {
    id: number;
    stock: Stock;
    quantityTransaction: number;
    quantityBefore: number;
    quantityAfter: number;
    createdAt: Date;
    updatedAt: Date;
    transitionType: TransactionType;
}
