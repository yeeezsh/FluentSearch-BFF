import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { DATABASE_CONNECTION } from '../src/database/constants/database.constant';
import { CreateUserDto } from '../src/user/dtos/user.dto';
import { UserModule } from '../src/user/user.module';
import {
  mockDatabaseFactory,
  replSet,
} from '../src/utils/mock-database.factory';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useFactory({
        factory: async () => mockDatabaseFactory(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await mongoose.disconnect();
    await replSet.stop();
  });

  it('/user (POST)', () => {
    const userCreatePayload: CreateUserDto = {
      mainEmail: 'test@test.com',
      name: 'test user',
      password: '12345',
    };
    return request(app.getHttpServer())
      .post('/user/register')
      .send(userCreatePayload)
      .expect(201);
  });

  it('/user (POST) same email should be throw', () => {
    const userCreatePayload: CreateUserDto = {
      mainEmail: 'test@test.com',
      name: 'test user',
      password: '12345',
    };
    return request(app.getHttpServer())
      .post('/user/register')
      .send(userCreatePayload)
      .expect(400);
  });
});
