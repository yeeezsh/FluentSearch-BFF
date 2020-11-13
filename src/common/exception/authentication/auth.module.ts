import { Module } from '@nestjs/common';
import { UserController } from '../../../user/user.controller';
import { UserModule } from '../../../user/user.module';
import { userProivders } from '../../../user/user.providers';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [AuthService, ...userProivders],
})
export class CatsModule {}
