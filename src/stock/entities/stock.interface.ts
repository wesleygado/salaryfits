import { Medicine } from "src/medicine/entities/medicine.entity";
import { StockTransaction } from "src/stock-transaction/entities/stock-transaction.entity";

export interface IStock {
  id: number;
  stockTransaction: StockTransaction[];
  medicine: Medicine;
  quantity: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}