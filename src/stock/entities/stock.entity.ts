import { Medicine } from "src/medicine/entities/medicine.entity";
import { IStock } from "./stock.interface";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StockTransaction } from "src/stock-transaction/entities/stock-transaction.entity";

@Entity('stocks')
export class Stock implements IStock {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Medicine, (medicine) => medicine.stock)
  @JoinColumn({ name: 'medicine_id' })
  medicine: Medicine;

  @OneToMany(() => StockTransaction, (stockTransaction) => stockTransaction.stock)
  stockTransaction: StockTransaction[];

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  description: string;

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
