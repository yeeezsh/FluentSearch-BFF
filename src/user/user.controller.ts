import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user')
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.creatUser(body);
  }
}
