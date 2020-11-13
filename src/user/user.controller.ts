import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthenticationService } from '../common/authentication/authentication.service';
import { UsersQuery } from './@types/user.query.types';
import { CreateUserDto } from './dtos/user.dto';
import { UserLoginDto } from './dtos/user.login.dto';
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
  //TODO: cookie
  async loginUser(@Body() body: UserLoginDto, @Res() res: Response) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    //const cookie = this.authService.getCookie(user._id);
    return;
  }
}
