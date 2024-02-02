import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IMedicine } from "./medcine.interface";
import { Stock } from "src/stock/entities/stock.entity";
import { Expose } from "class-transformer";

@Entity('medicines')
export class Medicine implements IMedicine {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, length: 100 })
  name: string;

  @OneToMany(() => Stock, (stock) => stock.medicine)
  stock: Stock[];

  @Column({ nullable: false, length: 100 })
  laboratory: string;

  @Column({ nullable: false, type: 'decimal', precision: 7, scale: 2 })
  price: number;

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
