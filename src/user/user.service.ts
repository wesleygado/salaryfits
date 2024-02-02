import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>) {}
 
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.password = await this.setPassword(updateUserDto.password);
    const updateResult = await this.userRepository.update(id, updateUserDto);

    if (!updateResult.affected) {
      throw new NotFoundException(`Usuário de id: ${id} não encontrado`);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteResult = await this.userRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Usuário de id: ${id} não encontrado`);
    }
    return { message: 'Usuário foi excluido com sucesso' };
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({email});
  }

  private async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
