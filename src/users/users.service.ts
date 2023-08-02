import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './add-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(page: number, perPage: number): Promise<User[]> {
    const skip = (page - 1) * perPage;
    const take = perPage;
    return this.usersRepository.find({ skip, take });
  }

  async findById(id: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { id: Number(id) } });
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    await this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: Number(id) },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    await this.usersRepository.save(user);
    return user;
  }
}
