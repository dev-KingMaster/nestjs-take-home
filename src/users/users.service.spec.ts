import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockUser: User = {
    id: 1,
    email: 'example@traderinteractive.com',
    name: 'Example User',
  };

  interface MockPageType {
    page: number;
    perPage: number;
  }

  const mockPage: MockPageType = {
    page: 1,
    perPage: 2,
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('FindAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('should return a list of users', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([mockUser]);

      const users = await service.findAll(mockPage.page, mockPage.perPage);

      expect(repository.find).toHaveBeenCalled();
      expect(users).toEqual([mockUser]);
    });
  });
});
