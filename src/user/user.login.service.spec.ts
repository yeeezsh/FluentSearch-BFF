import { Test, TestingModule } from '@nestjs/testing';
import bcrypt from 'bcryptjs';
import { DATABASE_CONNECTION } from '../database/constants/database.constant';
import { CreateUserDto } from './@dtos/user.dto';
import { UserLoginDto } from './@dtos/user.login.dto';
import { USER_MODEL } from './constants/user.provider.constant';
import { UserLoginService } from './user.login.service';
import { UserService } from './user.service';

describe('UserLoginService tests', () => {
  let service: UserLoginService;
  let userService: UserService;
  let email: String;
  let module: TestingModule;

  const expectedEmailTest = 'test@mail.com';
  const mockCreateUserDto: CreateUserDto = {
    mainEmail: expectedEmailTest,
    name: 'test name',
    password: '12345678',
  };

  const mockUserLogin: UserLoginDto = {
    email: expectedEmailTest,
    password: '12345678',
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [UserLoginService],
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useValue({})
      .overrideProvider(USER_MODEL)
      .useValue({
        findOne: jest.fn().mockImplementation(() => {}),
      })
      .compile();

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);

    userService = module.get<UserService>(UserService);
    service = module.get<UserLoginService>(UserLoginService);
    const user = await userService.createUser(mockCreateUserDto);
    email = user.mainEmail;
  });

  // afterAll(async () => {
  //   await module.close();
  //   await mongoose.disconnect();
  //   await replSet.stop();
  // });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  //loginUser
  //FIXME: "TypeError: Cannot read property 'compare' of undefined" before it
  it('Should be return detail of user', async () => {
    const loginUser = await service.userLogin(mockUserLogin);
    expect(loginUser?.mainEmail).toEqual(email);
  });
});
