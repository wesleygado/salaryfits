import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Medicine } from 'src/medicine/entities/medicine.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'IsIdMedicineExists', async: true })
@Injectable()
export class IsIdMedicineExists implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Medicine)
    private medicineRepository: Repository<Medicine>,
  ) {}
  async validate(id: number): Promise<boolean> {
    const idExists = await this.medicineRepository.findOneBy({
      id: id,
    });

    return idExists ? true : false;
  }
  defaultMessage?(): string {
    return 'ID de medicamento inválido';
  }
}