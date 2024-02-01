import { Stock } from "src/stock/entities/stock.entity";
import { IStockTransaction } from "./stock-transaction.interface";
import { TransactionType } from "./transaction-type.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('stock_transactions')
export class StockTransaction implements IStockTransaction {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Stock, stock => stock.stockTransaction)
  @JoinColumn({ name: 'stock_id' })
  stock: Stock;

  @Column({ nullable: false })
  quantityTransaction: number;

  @Column({ nullable: false })
  quantityBefore: number;

  @Column({ nullable: false })
  quantityAfter: number;

  @Column({
    nullable: false,
    type: "enum",
    enum: TransactionType,
  })
  transitionType: TransactionType;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
