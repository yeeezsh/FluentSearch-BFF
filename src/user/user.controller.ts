import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { UserDoc } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDoc[]> {
    return this.userService.getUsers();
  }

  @Post('/user')
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }
}
