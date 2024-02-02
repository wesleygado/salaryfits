import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private medicineRepository: Repository<Medicine>) { }

  async create(createMedicineDto: CreateMedicineDto): Promise<Medicine> {
    const medicine = this.medicineRepository.create(createMedicineDto);
    return await this.medicineRepository.save(medicine);
  }

  async findAll(): Promise<Medicine[]> {
    return await this.medicineRepository.find({ relations: { stock: true } });
  }

  async findOne(id: number): Promise<Medicine> {
    const medicine = await this.medicineRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        stock: true,
      },
    });

    if (!medicine) {
      throw new NotFoundException(`Medicamento de id: ${id} não encontrado`);
    }
    return medicine;

  }

  async update(id: number, updateMedicineDto: UpdateMedicineDto): Promise<Medicine> {
    const updateResult = await this.medicineRepository.update(id, updateMedicineDto);

    if (!updateResult.affected) {
      throw new NotFoundException(`Medicamento de id: ${id} não encontrado`);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: String }> {
    const deleteResult = await this.medicineRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Medicamento de id: ${id} não encontrado`);
    }
    return { message: 'O medicamento foi excluido com sucesso' };
  }
}
