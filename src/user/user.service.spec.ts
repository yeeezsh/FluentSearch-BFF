import { Test, TestingModule } from '@nestjs/testing';
import mongoose, { Types } from 'mongoose';
import {
  mongodbMockFactory,
  replSet,
} from '../../test/mock/mongodb.mock.factory';
import { ConfigModule } from '../config/config.module';
import { DATABASE_CONNECTION } from '../database/constants/database.constant';
import { DatabaseModule } from '../database/database.module';
import { UserRegisterInput } from './dtos/inputs/user-register.input';
import { userProivders } from './user.providers';
import { UserService } from './user.service';

describe('UserService tests', () => {
  let service: UserService;
  let database: Promise<typeof mongoose>;
  let id: Types.ObjectId;
  let module: TestingModule;

  const expectedEmailTest = 'test@mail.com';
  const mockCreateUserDto: UserRegisterInput = {
    mainEmail: expectedEmailTest,
    name: 'test name',
    password: '12345678',
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigModule],
      providers: [...userProivders, UserService],
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useFactory({
        factory: async () => mongodbMockFactory(),
      })
      .compile();

    service = module.get<UserService>(UserService);
    database = module.get<Promise<typeof mongoose>>(DATABASE_CONNECTION);

    const user = await service.createUser(mockCreateUserDto);
    id = user._id;
  });

  afterAll(async () => {
    await module.close();
    (await database).connection.close();
    await replSet.stop();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  // findById
  it('Should return user that find by id', async () => {
    const user = await service.findById(id);
    expect(user?.mainEmail).toEqual(expectedEmailTest);
  });

  // getUsers
  it('Should return all user', async () => {
    const users = await service.getUsers();
    expect(users.length).toBe(1);
  });

  // createUser
  it('Should create a user correctly', async () => {
    const expectedEmailTest2 = 'test2@mail.com';
    const doc = await service.createUser({
      ...mockCreateUserDto,
      mainEmail: expectedEmailTest2,
    });

    const userDoc = await service.findById(doc._id);

    expect(userDoc?.mainEmail).toEqual(expectedEmailTest2);
  });
});
