import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { userProivders } from './user.providers';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [UserService, UserResolver, ...userProivders],
})
export class UserModule {}
