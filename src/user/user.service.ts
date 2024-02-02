import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.enum';

@Injectable()
export class UserService {
  findOneByEmail(email: string) {
    let user = new User()
    return user = {
      id: 3,
      email: 'teste@gmail.com',
      password: '123',
      createdAt: new Date('2010-10-10'),
      updatedAt: new Date('2010-10-10'),
      name: 'wes',
      role: UserRole.ADMIN
    };
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
