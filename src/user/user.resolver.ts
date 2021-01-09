import { Args, Query, Resolver } from '@nestjs/graphql';
import { SkipLimitArgs } from './dtos/skip-limit.args';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'User', nullable: true })
  async getUser(
    @Args('id', { type: () => String, nullable: true }) id: string,
  ) {
    return this.userService.getUser(id);
  }

  @Query(() => [User], { name: 'Users' })
  async getUsers(@Args() skipLimit: SkipLimitArgs) {
    const { skip, limit } = skipLimit;
    return this.userService.getUsers(skip, limit);
  }
}
