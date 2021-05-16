import { Module } from '@nestjs/common';
import { AuthenticationResolver } from './authentication.resolver';
import { AuthenticationService } from './authentication.service';

@Module({
  providers: [AuthenticationService, AuthenticationResolver],
})
export class AuthenticationModule {}
