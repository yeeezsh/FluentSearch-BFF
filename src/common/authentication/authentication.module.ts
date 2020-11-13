import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../../config/config.module';
import { UserModule } from '../../user/user.module';
import { userProivders } from '../../user/user.providers';
import { AuthenticationConfig } from './authentication.config';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthenticationConfig,
    }),
  ],
  providers: [AuthenticationService, ...userProivders],
})
export class AuthenticationModule {}
