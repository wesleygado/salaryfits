import { Medicine } from "src/medicine/entities/medicine.entity";

export interface IStock {
    id: number;
    medicine: Medicine;
    quantity: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}