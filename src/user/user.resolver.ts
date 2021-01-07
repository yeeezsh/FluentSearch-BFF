/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { SkipLimitArgs } from './dtos/skip-limit.args';
import { User } from './models/user.model';
import { UserRoleEnum } from './schemas/enums/user-role.enum';
import { UserService } from './user.service';

const mockDB = [
  {
    id: '25f02964-330d-4598-a25a-2a4d005e771c',
    name: 'annie',
    mainEmail: 'test@mail.com',
    role: UserRoleEnum.user,
  },
  {
    id: 'e2a6732a-1fc2-4f89-90f7-a54212238b7a',
    name: 'tom',
    mainEmail: 'test2@mail.com',
    role: UserRoleEnum.user,
  },
];

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User, { name: 'User', nullable: true })
  async getUser(
    @Args('id', { type: () => String, nullable: true }) id: string,
  ) {
    return mockDB.find(f => f.id === id);
  }

  @Query(returns => [User], { name: 'Users' })
  async getUsers(@Args() skipLimit: SkipLimitArgs) {
    return mockDB;
  }
}
