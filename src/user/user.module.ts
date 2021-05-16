import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ConfigModule } from '../config/config.module';
import { User } from './models/user.model';
import userSchema from './schemas/user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => AuthenticationModule),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
    ]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService, ConfigModule],
})
export class UserModule {}
