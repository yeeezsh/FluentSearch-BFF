import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { userProivders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [UserController],
  providers: [UserService, ...userProivders],
})
export class UserModule {}
