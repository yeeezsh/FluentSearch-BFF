import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { UserExceptionFilters } from '../common/filters/user-error.filter';
import { UserRegisterInput } from './dtos/inputs/user-register.input';
import { UsersQueryReturns } from './models/user-query-returns.model';
import { UserTrimPipe } from './pipes/user.trim.pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/lists')
  async getUsers(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<UsersQueryReturns> {
    return this.userService.getUsers(skip, limit);
  }

  @Post('/register')
  @UsePipes(new UserTrimPipe())
  @UseFilters(UserExceptionFilters)
  async createUser(@Body() body: UserRegisterInput): Promise<void> {
    await this.userService.createUser(body);
  }
}
