import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { UserLoginDto } from './dtos/user.login.dto';
import { UserDoc } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<UserDoc[]> {
    return this.userService.getAllUser();
  }

  @Post('/user')
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Post('/login')
  async loginUser(@Body() body: UserLoginDto, @Res() res: Response) {
    return;
  }
}
