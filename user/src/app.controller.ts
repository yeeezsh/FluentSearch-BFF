import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './app.service';
import { CreateUserDto } from './CreateUserDto.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return createUserDto;
    } catch(error) {
      console.log('esus')
    }
  }

  @Get()
  getHello(): CreateUserDto {
    return this.userService.getHello();
  }
}
