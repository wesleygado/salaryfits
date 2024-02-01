import { UserRole } from "./user-role.enum";

export interface IUser {
    id: number;
    name: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}