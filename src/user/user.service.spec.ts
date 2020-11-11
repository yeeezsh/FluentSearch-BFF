import { Test, TestingModule } from '@nestjs/testing';
import { MongoErrorException } from '../common/exception/mongo-error.exception';
import { mockIndexDuplicatedErrorMsg } from '../common/exception/mongo-error.exception.spec';
import { DATABASE_CONNECTION } from '../database/constants/database.constant';
import { DatabaseModule } from '../database/database.module';
import { mockDatabaseFactory } from '../utils/mock-database.factory';
import { CreateUserDto } from './dtos/user.dto';
import { userProivders } from './user.providers';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const mockUserPayload: CreateUserDto = {
    mainEmail: 'test@mail.com',
    name: 'test name',
    password: '12345678',
  };
  const expectedEmail = 'test@mail.com';

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a user correctly', async () => {
    const doc = await service.createUser(mockUserPayload);
    const userDoc = await service.findById(doc._id);

    expect(userDoc?.mainEmail).toEqual(expectedEmail);
  });

  it('Should throw an error when email is duplicated', async () => {
    try {
      await service.createUser(mockUserPayload);
    } catch {}
    const mockErrorInstance = new MongoErrorException(
      mockIndexDuplicatedErrorMsg,
    );

    await expect(service.createUser(mockUserPayload)).rejects.toEqual(
      mockErrorInstance,
    );
  });
});
