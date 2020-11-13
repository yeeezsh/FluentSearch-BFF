import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'nestjs-config/dist/module/config.service';
import { UserModule } from '../../user/user.module';
import { userProivders } from '../../user/user.providers';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      //secret: jwtConstants.secret,
      secret: ConfigService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: `${ConfigService.get('JWT_EXPIRATION_TIME')}s`,
      },
    }),
  ],
  providers: [AuthenticationService, ...userProivders],
})
export class AuthenticationModule {}
