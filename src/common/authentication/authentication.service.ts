import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'nestjs-config/dist/module/config.service';
import { UserLoginService } from '../../user/user.login.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userLoginService: UserLoginService,
    private readonly jwtService: JwtService,
    private conficService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    // : Promise<{
    //   email: string;
    //   role: UserRoleEnum;
    //   Authorization: string;
    // }> {
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
      const token = await this.jwtService.signAsync(payload);
      // return {
      //   ...payload,
      //   Authorization: sign,
      // };
      return `Authentication=${token}; Max-Age=${this.conficService.get(
        'JWT_EXPIRATION_TIME',
      )}`;
    } catch (err) {
      throw err;
    }
  }
}
