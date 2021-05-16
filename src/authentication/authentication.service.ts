import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Request } from 'express';
import { UserInvalidCredentialException } from '../common/exception/user.invalid-credential.exception';
import { UserService } from '../user/user.service';
import { UserLoginInputDTO } from './dtos/user-login.input.dto';
import { UserSessionDTO } from './dtos/user-session.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async userLogin(
    req: Request,
    args: UserLoginInputDTO,
  ): Promise<UserSessionDTO> {
    const user = await this.userService.getUserByEmail(args.email);
    const valid = await compare(args.password, user.password);
    if (!valid) throw new UserInvalidCredentialException();

    const parsed = {
      ...user,
      password: undefined,
    };
    const token = await this.jwtService.signAsync(parsed);

    req.res?.cookie('Authorization', `Bearer ${token}`, {
      httpOnly: true,
    });
    const session = req.session as Record<string, any>;
    session.user = parsed;

    return {
      ...user,
      _id: user._id,
    };
  }
}
