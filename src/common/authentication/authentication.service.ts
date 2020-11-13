import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRoleEnum } from '../../user/schemas/enums/user-role.enum';
import { UserLoginService } from '../../user/user.login.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userLoginService: UserLoginService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{
    email: string | undefined;
    role: UserRoleEnum;
    Authorization: string;
  }> {
    try {
      const user = await this.userLoginService.userLogin({
        email: email,
        password: password,
      });
      // if (user && user.password === password) {
      //   const { password, ...result } = user;
      //   return result;
      // }
      const payload = {
        _id: user?._id,
        email: user?.mainEmail,
        role: user?.role,
      };
      const sign = await this.jwtService.signAsync(payload);
      return {
        ...payload,
        Authorization: sign,
      };
      //return `Authentication=${sign}; HttpOnly; Path=/; Max-Age=${.get('JWT_EXPIRATION_TIME')}`;
    } catch (err) {
      throw err;
    }
  }
}
