import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from '../common/authentication/authentication.service';
import { CreateUserDto } from './@dtos/user.dto';
import { UserLoginDto } from './@dtos/user.login.dto';
import { UsersQuery } from './@types/user.query.types';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthenticationService,
  ) {}

  @Get()
  async getUsers(): Promise<UsersQuery> {
    return this.userService.getUsers();
  }

  @Post('/user')
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    await this.userService.createUser(body);
    return;
  }

  @Post('/auth/login')
  async loginUser(@Body() body: UserLoginDto, @Res() res: Response) {
    const { email, password } = body;
    const cookie = await this.authService.validateUser(email, password);
    res.setHeader('Set-Cookie', cookie);
    //TODO: what should I return? I understand that I shouldn't send a password, right??
    return res.send(email);
  }
}
