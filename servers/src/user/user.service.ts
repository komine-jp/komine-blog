import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private noteRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.create_date = createUserDto.update_date = new Date();
    createUserDto.password='123456'
    return await this.noteRepository.save(createUserDto);
  }

  async findAll() {
    return await this.noteRepository.find();
  }

  async findOne(id: number) {
    return await this.noteRepository.findByIds([id]);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.update_date = new Date();
    return await this.noteRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.noteRepository.delete(id);
  }
}
