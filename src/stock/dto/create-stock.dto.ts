import { Medicine } from "src/medicine/entities/medicine.entity";

export class CreateStockDto {
  medicine: Medicine;
  quantity: number;
  description: string
}
