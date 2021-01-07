/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { SkipLimitArgs } from './dtos/skip-limit.args';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => [User])
  async getUsers(@Args() skipAndLimit: SkipLimitArgs) {
    return [];
  }
}
