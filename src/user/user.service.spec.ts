import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { MongoErrorException } from '../common/exception/mongo-error.exception';
import { mockIndexDuplicatedErrorMsg } from '../common/exception/mongo-error.exception.spec';
import { DATABASE_CONNECTION } from '../database/constants/database.constant';
import { DatabaseModule } from '../database/database.module';
import { mockDatabaseFactory } from '../utils/mock-database.factory';
import { CreateUserDto } from './@dtos/user.dto';
import { userProivders } from './user.providers';
import { UserService } from './user.service';

describe('UserService tests', () => {
  let service: UserService;
  let id: Types.ObjectId;

  const expectedEmailTest = 'test@mail.com';
  const mockCreateUserDto: CreateUserDto = {
    mainEmail: expectedEmailTest,
    name: 'test name',
    password: '12345678',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [...userProivders, UserService],
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useFactory({
        factory: async () => mockDatabaseFactory(),
      })
      .compile();

    service = module.get<UserService>(UserService);
    const user = await service.createUser(mockCreateUserDto);
    id = user._id;
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

  it('Should throw an error IndexDuplicatedError when email is duplicated', async () => {
    const mockErrorInstance = new MongoErrorException(
      mockIndexDuplicatedErrorMsg,
    );

    await expect(service.createUser(mockCreateUserDto)).rejects.toEqual(
      mockErrorInstance,
    );
  });
});
