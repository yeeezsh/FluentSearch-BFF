import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../../user/user.module';
import { userProivders } from '../../user/user.providers';
import { jwtConstants } from './authentication.contants';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthenticationService, ...userProivders],
})
export class AuthenticationModule {}
