import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { UserModule } from '../user/user.module';
import { AuthenticationResolver } from './authentication.resolver';
import { AuthenticationService } from './authentication.service';

const JwtModuleBase = JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    secret: config.get().jwt.secretKey,
    signOptions: {
      expiresIn: config.get().jwt.expires,
    },
  }),
});
@Module({
  imports: [ConfigModule, UserModule, JwtModuleBase],
  providers: [AuthenticationService, AuthenticationResolver],
  exports: [JwtModuleBase, AuthenticationService, AuthenticationResolver],
})
export class AuthenticationModule {}
