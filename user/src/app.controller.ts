import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './app.service';
import { CreateUserDto } from './dtos/createUserDto.dto';
import { UserRegisterInterface } from './interfaces/userRegister.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.creatUser(body)
  }

  @Get()
  async getAllUser(): Promise<UserRegisterInterface[]> {
    return this.userService.getAllUser();
  }
}
