import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './add-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './update-user.dto';

@Controller('customers')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    const result = await this.usersService.findAll(page, perPage);
    return {
      pagination: {
        page,
        perPage,
      },
      result,
    };
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findById(id);
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    await this.usersService.create(createUserDto);
    return 'User has been successfully created';
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersService.update(id, updateUserDto);
    return user;
  }
}
