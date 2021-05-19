import { UseFilters, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { UserExceptionFilters } from '../common/filters/user-error.filter';
import { SkipLimitArgs } from './dtos/args/skip-limit.args';
import { UserRegisterInput } from './dtos/inputs/user-register.input';
import { UserUpdateInput } from './dtos/inputs/user-update.input';
import { User, UserWithId } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // user
  @Query(() => UserWithId, { name: 'User', nullable: true })
  async GetUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.getById(id);
  }

  // user by session
  @UseGuards(JwtAuthGuard)
  @Query(() => UserWithId, { nullable: true })
  async GetUserBySession(@Context('req') req: Request) {
    const session = req.session as Record<string, any>;
    const id = session.user._id;
    return this.userService.getById(id);
  }

  @UseFilters(UserExceptionFilters)
  @Mutation(() => UserWithId)
  async CreateUser(
    @Args('UserRegisterInput') userRegisterInput: UserRegisterInput,
  ) {
    return this.userService.createUser(userRegisterInput);
  }

  @Mutation(() => UserWithId)
  async UpdateUser(
    @Args('UserUpdateInput') userRegisterInput: UserUpdateInput,
  ) {
    return this.userService.updateUser(userRegisterInput);
  }

  // users
  @Query(() => [UserWithId], { name: 'Users' })
  async GetUsers(@Args() skipLimit: SkipLimitArgs) {
    const { skip, limit } = skipLimit;
    return this.userService.getUsers(skip, limit);
  }
}
