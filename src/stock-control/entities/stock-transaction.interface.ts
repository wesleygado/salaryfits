import { Stock } from "src/stock/entities/stock.entity";
import { TransactionType } from "./transaction-type.enum";

export interface IStockTransaction {
    id: number;
    stock: Stock;
    quantityTransaction: number;
    quantityBefore: number;
    quantityAfter: number;
    createdAt: Date;
    updatedAt: Date;
    transitionType: TransactionType;
}