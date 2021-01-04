import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { UsersQuery } from './@types/user.query.types';
import { CreateUserDto } from './dtos/user.dto';
import { UserTrimPipe } from './pipes/user.trim.pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UsersQuery> {
    return this.userService.getUsers();
  }

  @Post('/user')
  @UsePipes(new UserTrimPipe())
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    await this.userService.createUser(body);
    return;
  }
}
