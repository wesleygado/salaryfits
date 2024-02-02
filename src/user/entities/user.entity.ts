import { Column, BeforeInsert, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "./user-role.enum";
import { IUser } from "./user.interface";
import * as bcrypt from 'bcrypt';
import { Exclude, Expose } from "class-transformer";

@Entity('Users')
export class User implements IUser {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false})
    @Exclude()
    password: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    role: UserRole;

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

    @BeforeInsert()
    async setPassword(password?: string) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(password || this.password, salt);
    }
}
