import { UseFilters } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserExceptionFilters } from '../common/filters/user-error.filter';
import { SkipLimitArgs } from './dtos/args/skip-limit.args';
import { UserRegisterInput } from './dtos/inputs/user-register.input';
import { UserUpdateInput } from './dtos/inputs/user-update.input';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // user
  @Query(() => User, { name: 'User', nullable: true })
  async getUser(
    @Args('id', { type: () => String, nullable: true }) id: string,
  ) {
    return this.userService.getUser(id);
  }

  @UseFilters(UserExceptionFilters)
  @Mutation(() => User, { name: 'CreateUser' })
  async createUser(
    @Args('UserRegisterInput') userRegisterInput: UserRegisterInput,
  ) {
    return this.userService.createUser(userRegisterInput);
  }

  @Mutation(() => User, { name: 'UpdateUser' })
  async updateUser(
    @Args('UserUpdateInput') userRegisterInput: UserUpdateInput,
  ) {
    return this.userService.updateUser(userRegisterInput);
  }

  // users
  @Query(() => [User], { name: 'Users' })
  async getUsers(@Args() skipLimit: SkipLimitArgs) {
    const { skip, limit } = skipLimit;
    return this.userService.getUsers(skip, limit);
  }
}
