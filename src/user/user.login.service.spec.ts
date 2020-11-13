import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from '../database/constants/database.constant';
import { DatabaseModule } from '../database/database.module';
import { mockDatabaseFactory, replSet } from '../utils/mock-database.factory';
import { UserLoginDto } from './@dtos/user.login.dto';
import { UserLoginService } from './user.login.service';
import { userProivders } from './user.providers';
import { UserService } from './user.service';

describe('UserService tests', () => {
  let service: UserLoginService;
  //let id: Types.ObjectId;
  let module: TestingModule;

  //   const expectedEmailTest = 'test@mail.com';
  //   const mockCreateUserDto: CreateUserDto = {
  //     mainEmail: expectedEmailTest,
  //     name: 'test name',
  //     password: '12345678',
  //   };

  const mockLogin: UserLoginDto = {
    email: 'test@mail.com',
    password: '12345678',
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [...userProivders, UserService],
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useFactory({
        factory: async () => mockDatabaseFactory(),
      })
      .compile();

    service = module.get<UserLoginService>(UserLoginService);
    //const user = await service;
  });

  afterAll(async () => {
    await module.close();
    await mongoose.disconnect();
    await replSet.stop();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  //   it('Should be return detail of user by input email', () => {
  //     expect();
  //   });
});
