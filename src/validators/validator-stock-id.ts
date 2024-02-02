import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Stock } from 'src/stock/entities/stock.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'IsIdStockExists', async: true })
@Injectable()
export class IsIdStockExists implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}
  async validate(id: number): Promise<boolean> {
    const idExists = await this.stockRepository.findOneBy({
      id: id,
    });

    return idExists ? true : false;
  }
  defaultMessage?(): string {
    return 'ID de estoque inválido';
  }
}