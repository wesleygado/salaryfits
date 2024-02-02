import { Stock } from "src/stock/entities/stock.entity";
import { TransactionType } from "../entities/transaction-type.enum";
import { IsEnum, IsPositive, Validate } from "class-validator";
import { IsIdStockExists } from "src/validators/validator-stock-id";
import { Expose } from "class-transformer";

export class CreateStockTransactionDto {
  @IsPositive({ message: 'ID do estoque é obrigatório e deve ser um número' })
  @Validate(IsIdStockExists)
  stock: number;

  @IsPositive({ message: 'Quantidade da movimentação é obrigatório e deve ser um número' })
  @Expose({ name: 'quantity_transaction'})
  quantityTransaction: number;

  @IsEnum(TransactionType, { message: 'A movimentação do estoque deve ser inbound (entrada) ou outbound (saída)' })
  @Expose({ name: 'transition_type'})
  transitionType: TransactionType;
}