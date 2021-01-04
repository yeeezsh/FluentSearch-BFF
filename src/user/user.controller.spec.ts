import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../config/config.module';
import { USER_MODEL } from './constants/user.provider.constant';
import { UserController } from './user.controller';
import { userProivders } from './user.providers';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [UserController],
      providers: [UserService, ...userProivders],
    })
      .overrideProvider(USER_MODEL)
      .useValue({})
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
