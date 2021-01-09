import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import request from 'supertest';
import { DATABASE_CONNECTION } from '../src/database/constants/database.constant';
import { UserRegisterInput } from '../src/user/dtos/inputs/user-register.input';
import { UsersQueryReturns } from '../src/user/models/user-query-returns.model';
import { UserModule } from '../src/user/user.module';
import {
  mockDatabaseFactory,
  replSet,
} from '../src/utils/mock-database.factory';

const user1CreatePayload: UserRegisterInput = {
  mainEmail: 'test@test.com',
  name: 'username',
  password: '123456',
};

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useFactory({
        factory: async () => await mockDatabaseFactory(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await replSet.stop();
    await app.close();
  });

  it('/user (POST)', async () => {
    return request(app.getHttpServer())
      .post('/user/register')
      .send(user1CreatePayload)
      .expect(201);
  });

  it('/user (POST) same email should be throw', async () => {
    return request(app.getHttpServer())
      .post('/user/register')
      .send(user1CreatePayload)
      .expect(400);
  });

  it('/user (POST) bad data payload should be throw', async () => {
    const badUserCreatePayload: UserRegisterInput = {
      mainEmail: 'test.com', // bad email
      name: 'A',
      password: '123', // bad password
    };
    return request(app.getHttpServer())
      .post('/user/register')
      .send(badUserCreatePayload)
      .expect(400);
  });

  it('/lists (GET) should have 1 user', async () => {
    return request(app.getHttpServer()).get(
      '/user/lists?skip=0&limit=10',
      req => {
        const data = (req.body as unknown) as Array<UsersQueryReturns>;
        expect(data.length).toBe(1);
      },
    );
  });

  it('/lists (GET) should have 2 user & skip and limit is working correctly', async () => {
    const user2CreatePayload: UserRegisterInput = {
      mainEmail: 'test2@test.com',
      name: 'test user2',
      password: '123456',
    };
    await request(app.getHttpServer())
      .post('/user/register')
      .send(user2CreatePayload)
      .expect(201)
      .then(() =>
        request(app.getHttpServer()).get(
          '/user/lists?skip=0&limit=10', // get all
          req => {
            const data = (req.body as unknown) as UsersQueryReturns;
            expect(data.length).toBe(2);
          },
        ),
      );
  });
});
