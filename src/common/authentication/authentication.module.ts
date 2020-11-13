import { Module } from '@nestjs/common';
import { UserModule } from '../../user/user.module';
import { userProivders } from '../../user/user.providers';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [UserModule],
  providers: [AuthenticationService, ...userProivders],
})
export class AuthenticationModule {}
