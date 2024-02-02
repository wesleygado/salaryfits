import { Stock } from "src/stock/entities/stock.entity";
import { IStockTransaction } from "./stock-transaction.interface";
import { TransactionType } from "./transaction-type.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Expose } from "class-transformer";

@Entity('stock_transactions')
export class StockTransaction implements IStockTransaction {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Stock, stock => stock.stockTransaction, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: 'stock_id' })
  stock: Stock;

  @Column({ nullable: false })
  @Expose({ name: 'quantity_transaction'})
  quantityTransaction: number;

  @Column({ nullable: false })
  @Expose({ name: 'quantity_before'})
  quantityBefore: number;

  @Column({ nullable: false })
  @Expose({ name: 'quantity_after'})
  quantityAfter: number;

  @Column({
    nullable: false,
    type: "enum",
    enum: TransactionType,
  })
  @Expose({ name: 'transition_type'})
  transitionType: TransactionType;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Expose({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Expose({ name: 'updated_at'})
  updatedAt: Date;
}
