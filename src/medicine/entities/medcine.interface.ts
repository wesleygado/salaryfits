import { Stock } from "src/stock/entities/stock.entity";

export interface IMedicine{
    id: number;
    name: string;
    stock: Stock[];
    laboratory: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}