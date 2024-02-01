import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "./user-role.enum";
import { IUser } from "./user.interface";

@Entity('Users')
export class User implements IUser {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    role: UserRole;

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
