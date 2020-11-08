import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser() {
    return this.userService.getAllUser();
  }
  @Post('/user')
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }
}
