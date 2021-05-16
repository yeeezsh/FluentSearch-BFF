import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import bcryptjs from 'bcryptjs';
import { Request } from 'express';
import { MOCK_USER_DOCUMENT, MOCK_USER_SERVICE } from '../user/tests/mock';
import { UserService } from '../user/user.service';
import { AuthenticationService } from './authentication.service';
import { UserLoginInputDTO } from './dtos/user-login.input.dto';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'mockSecret' })],
      providers: [AuthenticationService, UserService],
    })
      .overrideProvider(UserService)
      .useValue(MOCK_USER_SERVICE)
      .compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('when login() it should call jwt and user service', async () => {
    const mockReq = ({
      session: {
        user: MOCK_USER_DOCUMENT,
      },
    } as unknown) as Request<any>;
    const mockArgs = {
      password: 'mockpassword',
    } as UserLoginInputDTO;

    jest.spyOn(bcryptjs, 'compare').mockImplementation(() => true);
    await service.userLogin(mockReq, mockArgs);
    const expectedCalled = jest.spyOn(MOCK_USER_SERVICE, 'getUserByEmail');

    expect(expectedCalled).toBeCalled();
  });
});
