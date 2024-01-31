import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IMedicine } from "./medcine.interface";
import { Stock } from "src/stock/entities/stock.entity";

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
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;
}
