import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthenticationResolver } from './authentication.resolver';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [UserModule],
  providers: [AuthenticationService, AuthenticationResolver],
})
export class AuthenticationModule {}
