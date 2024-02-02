import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, Length, Validate } from "class-validator";
import { Medicine } from "src/medicine/entities/medicine.entity";
import { IsIdMedicineExists } from "src/validators/validator-medicine-id";

export class CreateStockDto {
  @IsPositive({ message: 'ID do medicamento é obrigatório e deve ser um número' })
  @Validate(IsIdMedicineExists)
  medicine: Medicine;

  @IsPositive({ message: 'Quantidade é obrigatório e deve ser um número positivo' })
  quantity: number;

  @Length(5, 50, { message: 'Descrição deve ter no mínimo 5 e no máximo 50 caracteres' })
  description: string

  @Expose({ name: 'created_at'})
  createdAt: Date;

  @Expose({ name: 'updated_at'})
  updatedAt: Date;
}
