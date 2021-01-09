import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { MongoHandlingEnum } from '../common/exception/@enums/mongo-handling.enum';
import { DuplcatedEmailException } from '../common/exception/duplicated-email.exception';
import { MongoErrorException } from '../common/exception/mongo-error.exception';
import { UsersQuery } from './@types/user.query.types';
import { UserRegisterInput } from './dtos/inputs/user-register.input';
import { UserTrimPipe } from './pipes/user.trim.pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/lists')
  async getUsers(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<UsersQuery> {
    return this.userService.getUsers(skip, limit);
  }

  @Post('/register')
  @UsePipes(new UserTrimPipe())
  async createUser(@Body() body: UserRegisterInput): Promise<void> {
    try {
      await this.userService.createUser(body);
      return;
    } catch (error) {
      const catchErr = (error as unknown) as MongoErrorException;

      if (catchErr.type == MongoHandlingEnum.IndexDuplicated)
        throw new DuplcatedEmailException();

      throw new InternalServerErrorException();
    }
  }
}
