import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { UserNotExistsException } from '../common/exception/user.not-exists.exception';
import { ConfigModule } from '../config/config.module';
import {
  MOCK_USER_DOCUMENT,
  MOCK_USER_MODEL,
  MOCK_USER_VALUE,
} from './tests/mock';
import { UserService } from './user.service';

describe('UserService tests', () => {
  let service: UserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [MOCK_USER_MODEL, UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  // findById
  it('Should return user that find by id', async () => {
    jest.spyOn(MOCK_USER_VALUE, 'lean').mockResolvedValue(MOCK_USER_DOCUMENT);

    const user = await service.getById(MOCK_USER_DOCUMENT._id.toHexString());
    expect(user?.mainEmail).toEqual(MOCK_USER_DOCUMENT.mainEmail);
  });

  // createUser
  it('Should create a user correctly', async () => {
    jest.spyOn(MOCK_USER_VALUE, 'lean').mockResolvedValue(MOCK_USER_DOCUMENT);

    const userDoc = await service.getById(MOCK_USER_DOCUMENT._id.toHexString());
    expect(userDoc?.mainEmail).toEqual(MOCK_USER_DOCUMENT.mainEmail);
  });

  // update user
  it('Should update a user correctly', async () => {
    jest
      .spyOn(MOCK_USER_VALUE, 'findByIdAndUpdate')
      .mockResolvedValue(MOCK_USER_DOCUMENT);

    const doc = await service.updateUser({
      id: MOCK_USER_DOCUMENT._id.toHexString(),
      name: 'K',
      mainEmail: 'hi@hello.com',
    });
    expect(doc?.mainEmail).toEqual(MOCK_USER_DOCUMENT.mainEmail);
  });

  // update user
  it('Should throw when update bad user id', async () => {
    const notExistId = Types.ObjectId();
    jest
      .spyOn(MOCK_USER_VALUE, 'findByIdAndUpdate')
      .mockImplementationOnce(() => {
        throw new UserNotExistsException();
      });

    await expect(async () => {
      await service.updateUser({
        id: notExistId.toHexString(),
        name: 'K',
        mainEmail: 'hi@hello.com',
      });
    }).rejects.toThrow(UserNotExistsException);
  });

  // getUsers
  it('Should return all user', async () => {
    jest
      .spyOn(MOCK_USER_VALUE, 'lean')
      .mockResolvedValue([MOCK_USER_DOCUMENT, MOCK_USER_DOCUMENT]);

    const users = await service.getUsers();
    expect(users.length).toBe(2);
  });

  // getUserByEmail
  it('Should call findOne when getUserByEmail', async () => {
    const expectedCalled = jest.spyOn(MOCK_USER_VALUE, 'findOne');
    const expectedCalled2 = jest.spyOn(MOCK_USER_VALUE, 'lean');
    await service.getUserByEmail('john@doe.com');
    expect(expectedCalled).toBeCalled();
    expect(expectedCalled2).toBeCalled();
  });
});
