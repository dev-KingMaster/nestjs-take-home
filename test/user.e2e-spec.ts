import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

import { UsersModule } from '../src/users/users.module';
import { User } from '../src/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';

describe('Users', () => {
  let app: INestApplication;
  let repository: Repository<User>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DATABASE_HOST || 'localhost',
          port: Number(process.env.DATABASE_PORT || 3306),
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.TESTING_DATABASE_NAME,
          entities: [User],
          synchronize: true,
        }),
        UsersModule,
      ],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    repository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));

    await repository.clear();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/customers (GET)', async () => {
    const data = {
      email: 'demo@traderinteractive.com',
      name: 'Demo User',
    };

    await repository.save(data);

    const { statusCode, body } = await request(app.getHttpServer()).get(
      '/customers?page=1&perPage=1',
    );
    expect(statusCode).toBe(200);
    expect(body.result).toEqual(
      expect.arrayContaining([expect.objectContaining(data)]),
    );
  });
});
