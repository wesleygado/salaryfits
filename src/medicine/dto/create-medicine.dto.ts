import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, Length } from "class-validator";

export class CreateMedicineDto {
  @IsNotEmpty({ message: 'Nome do remédio é obrigatório' })
  @Length(3, 50, { message: 'Nome deve ter no mínimo 3 e no máximo 50 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'Nome do laboratório é obrigatório' })
  @Length(3, 50, { message: 'Nome do laboratório ter no mínimo 3 e no máximo 50 caracteres' })
  laboratory: string;

  @IsNotEmpty({ message: 'Preço é obrigatório' })
  @IsNumber({},{ message: 'Preço deve ser um valor no formato 000.00'})
  price: number;
}
