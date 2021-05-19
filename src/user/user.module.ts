import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MinioModule } from 'nestjs-minio-client';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
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
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        endPoint: config.get().minio.endpoint,
        accessKey: config.get().minio.access_key,
        secretKey: config.get().minio.secret_key,
        port: config.get().minio.port,
        useSSL: config.get().minio.ssl,
      }),
    }),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService, ConfigModule],
})
export class UserModule {}
